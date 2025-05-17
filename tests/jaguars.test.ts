import 'reflect-metadata';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';
import { Jaguar } from '../src/models/jaguar';
import { container } from '../src/config/container';
import { TYPES } from '../src/types/types';
import { IDatabase } from '../src/interfaces/IDatabase';
import { MONGODB_URI } from '../src/config/env';
import mongoose from 'mongoose';

const { expect } = chai;
chai.use(chaiHttp);

// Тести API вебдодатку сайту про ягуара
describe('API вебдодатку сайту про ягуара', () => {
    // Отримуємо екземпляр бази даних з контейнера
    const database = container.get<IDatabase>(TYPES.IDatabase);
    // Створюємо спеціальний URI для тестової бази даних
    const testMongoURI = MONGODB_URI.replace(/\/[^/]*$/, '/jaguars-test');

    // Перед запуском тестів підключаємось до тестової бази даних
    before(async () => {
        await database.connect(testMongoURI);
        console.log('Підключено до тестової бази даних:', testMongoURI);
    });

    // Після всіх тестів очищуємо базу даних і відключаємося
    after(async () => {
        try {
            // Видаляємо тестову базу даних
            await mongoose.connection.db.dropDatabase();
            console.log('Тестову базу даних "jaguars-test" успішно видалено');
        } catch (error) {
            // Обробляємо можливі помилки
            console.log(
                'Помилка видалення тестової бази даних:',
                error instanceof Error ? error.message : 'Невідома помилка',
            );
        } finally {
            // В будь-якому разі відключаємося від бази даних
            await database.disconnect();
            console.log('Відключено від тестової бази даних');
        }
    });

    // Тести для перевірки підключення до бази даних
    describe('Підключення до бази даних', () => {
        it('має перевірити підключення до тестової бази даних', () => {
            expect(database.isConnected()).to.be.true;
            expect(database.getConnectionUri()).to.equal(testMongoURI);
            console.log('Підключення до бази даних успішно перевірено');
        });
    });

    // Перед кожним тестом очищуємо колекцію ягуара
    beforeEach(async () => {
        await Jaguar.deleteMany({});
    });

    // Тести для створення запису про нового ягуара (POST-запит)
    describe('POST /api/jaguars', () => {
        it('має створити запис про нового ягуара', done => {
            // Тестові дані ягуара
            const jaguar = {
                name: 'Вухань',
                age: 2,
                height: 30,
                weight: 2.5,
                gender: 'male' as const,
                description: 'Сірий ягуар',
                runSpeed: '2 кілометра',
            };

            // Виконуємо POST-запит для створення запису про ягуара
            chai.request(app)
                .post('/api/jaguars')
                .send(jaguar)
                .end((err, res) => {
                    if (err !== null && err !== undefined) {
                        return done(err);
                    }
                    // Перевіряємо відповідь
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property('name', jaguar.name);
                    expect(res.body).to.have.property('age', jaguar.age);
                    expect(res.body).to.have.property('height', jaguar.height);
                    expect(res.body).to.have.property('weight', jaguar.weight);
                    expect(res.body).to.have.property('gender', jaguar.gender);
                    expect(res.body).to.have.property('description', jaguar.description);
                    expect(res.body).to.have.property('dateAdded');
                    expect(res.body).to.have.property('runSpeed', '2 кілометра');
                    expect(new Date(res.body.dateAdded)).to.be.instanceOf(Date);
                    done();
                });
        });
    });

    // Тести для отримання всіх записів ягуара (GET-запит)
    describe('GET /api/jaguars', () => {
        it('має отримати всіх ягуара', async () => {
            // Створюємо тестовий запис ягуара
            const testJaguar = new Jaguar({
                name: 'Білан',
                age: 3,
                height: 35,
                weight: 3.2,
                gender: 'male',
                description: 'Білий ягуар',
                runSpeed: '2 кілометра',
            });
            await testJaguar.save();

            // Виконуємо GET-запит для отримання всіх записів ягуара
            const res = await chai.request(app).get('/api/jaguars');
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.equal(1);
            expect(res.body[0]).to.have.property('name', 'Білан');
            expect(res.body[0]).to.have.property('gender', 'male');
            expect(res.body[0]).to.have.property('description', 'Білий ягуар');
            expect(res.body[0]).to.have.property('dateAdded');
            expect(res.body[0]).to.have.property('runSpeed', '2 кілометра');
            expect(new Date(res.body[0].dateAdded)).to.be.instanceOf(Date);
        });
    });

    // Тести для отримання запису конкретного ягуара за ID (GET-запит)
    describe('GET /api/jaguars/:id', () => {
        it('має отримати конкретного ягуара за id', async () => {
            // Створюємо запис тестового ягуара
            const testJaguar = new Jaguar({
                name: 'Косий',
                age: 1,
                height: 25,
                weight: 1.8,
                gender: 'male',
                description: 'Коричневий ягуар',
                runSpeed: '2 кілометра',
            });
            const savedJaguar = await testJaguar.save();

            // Виконуємо GET-запит для отримання запису ягуара за ID
            const res = await chai.request(app).get(`/api/jaguars/${String(savedJaguar._id)}`);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('name', 'Косий');
            expect(res.body).to.have.property('age', 1);
            expect(res.body).to.have.property('height', 25);
            expect(res.body).to.have.property('weight', 1.8);
            expect(res.body).to.have.property('gender', 'male');
            expect(res.body).to.have.property('description', 'Коричневий ягуар');
            expect(res.body).to.have.property('runSpeed', '2 кілометра');
        });

        it('має повернути 404 для неіснуючого ягуара', async () => {
            // Виконуємо GET-запит для неіснуючого ID ягуара
            const res = await chai.request(app).get('/api/jaguars/654321654321654321654321');
            expect(res).to.have.status(404);
        });
    });

    // Тести для повного оновлення запису про ягуара (PUT-запит)
    describe('PUT /api/jaguars/:id', () => {
        it('має повністю оновити запис про ягуара', async () => {
            // Створюємо тестового ягуара
            const testJaguar = new Jaguar({
                name: 'Оригінальний',
                age: 1,
                height: 25,
                weight: 1.8,
                gender: 'male',
                description: 'Початковий опис',
                runSpeed: '2 кілометра',
            });
            const savedJaguar = await testJaguar.save();

            // Дані для оновлення ягуара
            const updatedData = {
                name: 'Оновлений',
                age: 2,
                height: 30,
                weight: 2.5,
                gender: 'female',
                description: 'Оновлений опис',
                runSpeed: '3 кілометра',
            };

            // Виконуємо PUT-запит для повного оновлення запису про ягуара
            const res = await chai
                .request(app)
                .put(`/api/jaguars/${String(savedJaguar._id)}`)
                .send(updatedData);

            // Перевіряємо результат
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('name', 'Оновлений');
            expect(res.body).to.have.property('age', 2);
            expect(res.body).to.have.property('height', 30);
            expect(res.body).to.have.property('weight', 2.5);
            expect(res.body).to.have.property('gender', 'female');
            expect(res.body).to.have.property('description', 'Оновлений опис');
            expect(res.body).to.have.property('dateAdded');
            expect(res.body).to.have.property('runSpeed', '3 кілометра');
            expect(new Date(res.body.dateAdded)).to.be.instanceOf(Date);
        });

        it("має завершитися невдачею при відсутності обов'язкових полів", async () => {
            // Створюємо тестового ягуара
            const testJaguar = new Jaguar({
                name: 'Оригінальний',
                age: 1,
                height: 25,
                weight: 1.8,
                gender: 'male',
                description: 'Початковий опис',
                runSpeed: '2 кілометра',
            });
            const savedJaguar = await testJaguar.save();

            // Неповні дані для оновлення (відсутні обов'язкові поля)
            const incompleteData = {
                name: 'Оновлений',
                age: 2,
                // height і weight відсутні
                gender: 'female',
                description: 'Оновлений опис',
                runSpeed: '2 кілометра',
            };

            // Виконуємо PUT-запит з неповними даними
            const res = await chai
                .request(app)
                .put(`/api/jaguars/${String(savedJaguar._id)}`)
                .send(incompleteData);

            // Перевіряємо, що запит завершився з помилкою
            expect(res).to.have.status(400);

            // Перевіряємо, що ягуар не змінився
            const unchangedJaguar = await Jaguar.findById(savedJaguar._id);
            expect(unchangedJaguar).to.have.property('name', 'Оригінальний');
            expect(unchangedJaguar).to.have.property('height', 25);
            expect(unchangedJaguar).to.have.property('weight', 1.8);
            expect(unchangedJaguar).to.have.property('runSpeed', '2 кілометра');
        });
    });

    // Тести для часткового оновлення запису про ягуара (PATCH-запит)
    describe('PATCH /api/jaguars/:id', () => {
        it('має частково оновити запис про ягуара', async () => {
            // Створюємо тестового ягуара
            const testJaguar = new Jaguar({
                name: 'Оригінальний',
                age: 1,
                height: 25,
                weight: 1.8,
                gender: 'male',
                description: 'Початковий опис',
                runSpeed: '2 кілометра',
            });
            const savedJaguar = await testJaguar.save();

            // Дані для часткового оновлення
            const patchData = {
                name: 'Частково оновлений',
                age: 3,
                description: 'Оновлений опис',
                runSpeed: '3 кілометра',
            };

            // Виконуємо PATCH-запит
            const res = await chai
                .request(app)
                .patch(`/api/jaguars/${String(savedJaguar._id)}`)
                .send(patchData);

            // Перевіряємо результат
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('name', 'Частково оновлений');
            expect(res.body).to.have.property('age', 3);
            expect(res.body).to.have.property('height', 25);
            expect(res.body).to.have.property('weight', 1.8);
            expect(res.body).to.have.property('gender', 'male');
            expect(res.body).to.have.property('description', 'Оновлений опис');
            expect(res.body).to.have.property('dateAdded');
            expect(res.body).to.have.property('runSpeed', '3 кілометра');
            expect(new Date(res.body.dateAdded)).to.be.instanceOf(Date);
        });

        it('демонструє різницю між PATCH і PUT з частковими оновленнями', async () => {
            // Створюємо тестового ягуара
            const testJaguar = new Jaguar({
                name: 'Оригінальний',
                age: 1,
                height: 25,
                weight: 1.8,
                gender: 'male',
                description: 'Початковий опис',
                runSpeed: '2 кілометра',
            });
            const savedJaguar = await testJaguar.save();

            // Ті самі неповні дані, що не спрацювали з PUT, мають працювати з PATCH
            const partialData = {
                name: 'Оновлений',
                age: 2,
                // height і weight навмисно відсутні
                gender: 'female',
                description: 'Оновлений опис',
                runSpeed: '3 кілометра',
            };

            // Виконуємо PATCH-запит
            const res = await chai
                .request(app)
                .patch(`/api/jaguars/${String(savedJaguar._id)}`)
                .send(partialData);

            // Перевіряємо результат
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('name', 'Оновлений');
            expect(res.body).to.have.property('age', 2);
            expect(res.body).to.have.property('runSpeed', '3 кілометра');
            // Ці поля мають зберегти свої початкові значення
            expect(res.body).to.have.property('height', 25);
            expect(res.body).to.have.property('weight', 1.8);
            expect(res.body).to.have.property('gender', 'female');
            expect(res.body).to.have.property('description', 'Оновлений опис');
        });
    });

    // Тести для отримання метаданих (HEAD-запит)
    describe('HEAD /api/jaguars', () => {
        it('має повернути заголовки метаданих', async () => {
            // Виконуємо HEAD-запит
            const res = await chai
                .request(app)
                .head('/api/jaguars')
                .set('Accept', 'application/json');

            // Перевіряємо статус відповіді
            expect(res).to.have.status(200);

            // Виводимо отримані заголовки
            console.log('Заголовки:');
            console.log('-----------------');
            Object.entries(res.headers).forEach(([key, value]) => {
                console.log(`${key}: ${String(value)}`);
            });

            // Перевіряємо наявність необхідних заголовків
            expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
            expect(res.headers['x-powered-by']).to.equal('Express');
            expect(res.headers['content-length']).to.equal('2');
        });
    });

    // Тести для видалення запису ягуара (DELETE-запит)
    describe('DELETE /api/jaguars/:id', () => {
        it('має видалити запис про ягуара', async () => {
            // Створюємо тестового ягуара
            const testJaguar = new Jaguar({
                name: 'Стрибунець',
                age: 2,
                height: 28,
                weight: 2.1,
                gender: 'female',
                description: 'Чорний ягуар',
                runSpeed: '2 кілометра',
            });
            const savedJaguar = await testJaguar.save();

            // Виконуємо DELETE-запит
            const res = await chai.request(app).delete(`/api/jaguars/${String(savedJaguar._id)}`);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message', 'Запис про ягуара видалено');

            // Перевіряємо, що запис про ягуара дійсно видалено з бази
            const findJaguar = await Jaguar.findById(savedJaguar._id);
            expect(findJaguar).to.be.null;
        });
    });
});

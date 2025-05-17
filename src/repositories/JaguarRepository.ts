import { injectable } from 'inversify';
import { Jaguar, IJaguar } from '../models/jaguar';

// Клас-репозиторій для роботи з ягуарами
// Анотація injectable дозволяє впровадити цей репозиторій через IoC контейнер
@injectable()
export class JaguarRepository {
    // Метод для отримання всіх ягуара з бази даних
    public async findAll(): Promise<IJaguar[]> {
        return Jaguar.find();
    }

    // Метод для пошуку ягуара за унікальним ідентифікатором
    public async findById(id: string): Promise<IJaguar | null> {
        return Jaguar.findById(id);
    }

    // Метод для створення нової ягуара в базі даних
    public async create(jaguarData: IJaguar): Promise<IJaguar> {
        const jaguar = new Jaguar(jaguarData);
        return jaguar.save();
    }

    // Метод для видалення ягуара за ідентифікатором
    public async delete(id: string): Promise<boolean> {
        const result = await Jaguar.findByIdAndDelete(id);
        return result !== null;
    }

    // Метод для повного оновлення даних про ягуара (заміна всіх полів)
    public async update(id: string, jaguarData: IJaguar): Promise<IJaguar | null> {
        return Jaguar.findByIdAndUpdate(id, jaguarData, { new: true });
    }

    // Метод для часткового оновлення даних про ягуара (оновлення лише вказаних полів)
    public async patch(id: string, jaguarData: Partial<IJaguar>): Promise<IJaguar | null> {
        return Jaguar.findByIdAndUpdate(id, { $set: jaguarData }, { new: true });
    }
}

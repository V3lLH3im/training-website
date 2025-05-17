import { Router, Request, Response } from 'express';
import { container } from '../config/container';
import { JaguarRepository } from '../repositories/JaguarRepository';

// Створюємо новий роутер Express
const router = Router();
// Отримуємо екземпляр репозиторію ягуара з контейнера інверсії залежностей
const jaguarRepository = container.get(JaguarRepository);

// Роутер для HTTP метода GET / - отримання всіх записів ягуара
router.get('/', (async (_req: Request, res: Response) => {
    try {
        // Отримуємо всі записи ягуара з бази даних через репозиторій
        const jaguars = await jaguarRepository.findAll();
        res.json(jaguars);
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(500).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Роутер для HTTP метода GET /:id - отримання запису одного ягуара за ідентифікатором
router.get('/:id', (async (req: Request, res: Response) => {
    try {
        // Пошук ягуара за ідентифікатором
        const jaguar = await jaguarRepository.findById(req.params.id);
        if (jaguar) {
            res.json(jaguar);
        } else {
            // Якщо ягуар не знайдений, повертаємо 404 помилку
            res.status(404).json({ message: 'Запис ягуара не знайдено' });
        }
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(500).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Роутер для HTTP метода POST / - створення нового запису ягуара
router.post('/', (async (req: Request, res: Response) => {
    try {
        // Створюємо новий запис ягуара з даних запиту
        const newJaguar = await jaguarRepository.create(req.body);
        // Повертаємо статус 201 (Created) і дані створеного ягуара
        res.status(201).json(newJaguar);
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(400).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Роутер для HTTP метода PUT /:id - повне оновлення запису ягуара
router.put('/:id', (async (req: Request, res: Response) => {
    try {
        // Перевірка наявності всіх обов'язкових полів для PUT запиту
        const requiredFields = ['name', 'age', 'height', 'weight', 'gender'];
        const missingFields = requiredFields.filter(field => !(field in req.body));

        // Якщо є відсутні поля, повертаємо помилку 400 Bad Request
        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Відсутні обов'язкові поля: ${missingFields.join(', ')}`,
            });
        }

        // Оновлюємо ягуара з вказаним ID
        const jaguar = await jaguarRepository.update(req.params.id, req.body);
        if (jaguar) {
            return res.json(jaguar);
        } else {
            // Якщо ягуар не знайдений, повертаємо 404 помилку
            return res.status(404).json({ message: 'Запис ягуара не знайдено' });
        }
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        return res.status(400).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Роутер для HTTP метода PATCH /:id - часткове оновлення запису ягуара
router.patch('/:id', (async (req: Request, res: Response) => {
    try {
        // Часткове оновлення запису ягуара - передаються лише ті поля, які потрібно змінити
        const jaguar = await jaguarRepository.patch(req.params.id, req.body);
        if (jaguar) {
            res.json(jaguar);
        } else {
            // Якщо ягуар не знайдений, повертаємо 404 помилку
            res.status(404).json({ message: 'Запис ягуара не знайдено' });
        }
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(400).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Роутер для HTTP метода DELETE /:id - видалення запису ягуара
router.delete('/:id', (async (req: Request, res: Response) => {
    try {
        // Видаляємо дані про ягуара за ID
        const jaguar = await jaguarRepository.delete(req.params.id);
        if (jaguar) {
            // У разі успіху повертаємо повідомлення про видалення
            res.json({ message: 'Запис про ягуара видалено' });
        } else {
            // Якщо ягуар не знайдена, повертаємо 404 помилку
            res.status(404).json({ message: 'Запис про ягуара не знайдено' });
        }
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(500).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

export default router;

import { Schema, model } from 'mongoose';

// Інтерфейс для об'єкта "Ягуар"
interface IJaguar {
    name: string; // Ім'я ягуара
    age: number; // Вік ягуара у роках
    height: number; // Висота ягуара в сантиметрах
    weight: number; // Вага ягуара в кілометрах
    gender: 'male' | 'female'; // Стать ягуара: 'male' - самець, 'female' - самка
    description?: string; // Опис ягуара (необов'язкове поле)
    runSpeed: string; // Кількість з'їденого листя евкаліпту за день, кг
    dateAdded: Date; // Дата додавання запису до бази даних
}

// Схема MongoDB для моделі "Ягуар"
const jaguarSchema = new Schema<IJaguar>({
    name: {
        type: String,
        required: true, // Поле є обов'язковим
    },
    age: {
        type: Number,
        required: true, // Поле є обов'язковим
    },
    height: {
        type: Number,
        required: true, // Поле є обов'язковим
    },
    weight: {
        type: Number,
        required: true, // Поле є обов'язковим
    },
    gender: {
        type: String,
        required: true, // Поле є обов'язковим
        enum: ['male', 'female'], // Допустимі значення: 'male' або 'female'
    },
    description: String, // Необов'язкове текстове поле
    dateAdded: {
        type: Date,
        default: Date.now, // Значення за замовчуванням - поточна дата і час
    },
    runSpeed: {
        type: String,
        required: true, // Поле є обов'язковим
    },
});

// Створення моделі Mongoose на основі схеми
export const Jaguar = model<IJaguar>('Jaguar', jaguarSchema);
export type { IJaguar }; // Експортуємо інтерфейс для використання в інших файлах

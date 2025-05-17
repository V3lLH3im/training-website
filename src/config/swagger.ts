// Експорт специфікації Swagger/OpenAPI для документації про API
export const swaggerSpec = {
    // Версія специфікації OpenAPI
    openapi: '3.0.0',
    // Загальна інформація про API
    info: {
        title: 'API Сайту про Ягуара',
        version: '1.0.0',
        description: 'Документація API для Сайту про Ягуара',
    },
    // Налаштування серверів для тестування API
    servers: [
        {
            url:
                process.env.CODESPACE_NAME !== undefined
                    ? `https://${process.env.CODESPACE_NAME}-5000.app.github.dev`
                    : 'http://localhost:5000',
            description: 'Development server',
        },
    ],
    // Визначення роутерів API та операцій з ними
    paths: {
        '/api/jaguars': {
            // GET запит для отримання всіх ягуара
            get: {
                summary: 'Отримати всіх ягуарів',
                responses: {
                    '200': {
                        description: 'Список всіх ягуарів',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/Jaguar' },
                                },
                            },
                        },
                    },
                },
            },

            // POST запит для створення нового ягуара
            post: {
                summary: 'Створити нового ягуара',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Jaguar' },
                        },
                    },
                },
                responses: {
                    '201': {
                        description: "Створений об'єкт ягуар",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Jaguar' },
                            },
                        },
                    },
                },
            },
        },

        // Операції для конкретного ягуара за ID
        '/api/jaguars/{id}': {
            // GET запит для отримання ягуара за ID
            get: {
                summary: 'Отримати ягуара за ID',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID ягуара',
                        runSpeed: '',
                    },
                ],
                responses: {
                    '200': {
                        description: "Об'єкт ягуара",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Jaguar' },
                            },
                        },
                    },
                    '404': { description: 'Ягуара не знайдено' },
                },
            },

            // PUT запит для повного оновлення ягуара за ID
            put: {
                summary: 'Повністю оновити ягуара',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID ягуара',
                        runSpeed: '',
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Jaguar' },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: "Оновлений об'єкт ягуара",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Jaguar' },
                            },
                        },
                    },
                    '404': { description: 'Ягуара не знайдено' },
                },
            },
            // PATCH запит для часткового оновлення ягуара за ID
            patch: {
                summary: 'Частково оновити ягуара',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID ягуара',
                        runSpeed: '',
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Jaguar' },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: "Оновлений об'єкт ягуара",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Jaguar' },
                            },
                        },
                    },
                    '404': { description: 'Ягуара не знайдено' },
                },
            },
            // DELETE запит для видалення даних про ягуара за ID
            delete: {
                summary: 'Видалити дані про ягуара',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID ягуара',
                        runSpeed: '',
                    },
                ],
                responses: {
                    '200': { description: 'Повідомлення про успішне видалення' },
                    '404': { description: 'Ягуара не знайдено' },
                },
            },
        },
    },

    // Визначення компонентів для повторного використання
    components: {
        // Схеми даних
        schemas: {
            // Схема об'єкта Ягуар
            Jaguar: {
                type: 'object',
                required: ['name', 'age', 'height', 'weight', 'gender'],
                properties: {
                    name: {
                        type: 'string',
                        description: "Ім'я ягуара",
                    },
                    age: {
                        type: 'number',
                        description: 'Вік ягуара у роках',
                    },
                    height: {
                        type: 'number',
                        description: 'Висота ягуара в сантиметрах',
                    },
                    weight: {
                        type: 'number',
                        description: 'Вага ягуара в кілометрах',
                    },
                    gender: {
                        type: 'string',
                        enum: ['male', 'female'],
                        description: 'Стать ягуара',
                    },
                    description: {
                        type: 'string',
                        description: "Опис ягуара (необов'язкове поле)",
                    },
                    runSpeed: {
                        type: 'string',
                        description: 'Швидкість бігу, км/год',
                    },
                },
            },
        },
    },
};

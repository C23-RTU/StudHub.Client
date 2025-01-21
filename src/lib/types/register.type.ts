import { z } from 'zod';

export type TRegisterDataSchema = z.infer<typeof RegisterDataSchema>

export const RegisterDataSchema = z
    .object({
        firstName: z
            .string()
            .min(1, 'Имя обязательно')
            .max(20, 'Имя не более 20 символов')
            .regex(/^[A-Za-zА-Яа-яёЁ\s]+$/, 'Некорректное имя'),
        lastName: z
            .string()
            .min(1, 'Фамилия обязательна')
            .max(40, 'Фамилия не более 40 символов')
            .regex(/^[A-Za-zА-Яа-яёЁ\s]+$/, 'Некорректная фамилия'),
        middleName: z
            .string()
            .max(25, 'Отчество не более 25 символов')
            // .regex(/^[A-Za-zА-Яа-яёЁ\s]+$/, 'Недопустимые символы')
            .optional(),
        birthDate: z
            .date({
                required_error: 'Дата рождения обязательна',
                invalid_type_error: 'Введите корректную дату 2',
            })
            .refine((date) => date <= new Date(), 'Введите корректную дату'),
        email: z.string().email('Некорректный email'),
        password: z
            .string()
            .min(12, 'Не менее 12 символов')
            .regex(/[a-z]/, 'Пароль должен содержать строчную букву')
            .regex(/[A-Z]/, 'Пароль должен содержать заглавную букву')
            .regex(/\d/, 'Пароль должен содержать цифру')
            .regex(/[^A-Za-z0-9]/, 'Пароль должен содержать спец. символ'),
        confirmPassword: z
            .string(),
        about: z
            .string()
            .max(200, 'Описание не может превышать 200 символов')
            .optional(),
        instituteId: z
            .number()
            .int('Некорректный идентификатор института')
            .optional()
            .nullable(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Пароли не совпадают',
        path: ['confirmPassword'],
    });
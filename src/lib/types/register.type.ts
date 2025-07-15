import { z } from 'zod';

export type TRegisterDataSchema = z.infer<typeof RegisterDataSchema>;

export const RegisterDataSchema = z
    .object({
        firstName: z
            .string()
            .min(1, 'Имя обязательно')
            .max(20, 'Имя не более 20 символов')
            .regex(/^[А-Я][а-я]+$/, 'Некорректное имя'),
        lastName: z
            .string()
            .min(1, 'Фамилия обязательна')
            .max(40, 'Фамилия не более 40 символов')
            .regex(/^[А-Я][а-я]+$/, 'Некорректная фамилия'),
        middleName: z
            .string()
            .max(25, 'Отчество не более 25 символов')
            .optional()
            .refine((value) => value === undefined || value.trim() === '' || /^[А-Я][а-я]+$/.test(value), {
                message: 'Недопустимые символы',
            }),
        birthDate: z
            .string({
                error: (issue) => (issue.input === undefined ? 'Дата рождения обязательна' : 'Введите корректную дату'),
            })
            .refine((value) => {
                const isValidFormat = /^\d{4}-\d{2}-\d{2}$/.test(value);
                if (!isValidFormat) return false;

                const date = new Date(value);
                return !isNaN(date.getTime()) && date <= new Date();
            }, 'Введите корректную дату'),
        email: z.string().email('Некорректный email'),
        password: z
            .string()
            .min(12, 'Не менее 12 символов')
            .regex(/[a-z]/, 'Пароль должен содержать строчную букву')
            .regex(/[A-Z]/, 'Пароль должен содержать заглавную букву')
            .regex(/\d/, 'Пароль должен содержать цифру')
            .regex(/[^A-Za-z0-9]/, 'Пароль должен содержать спец. символ'),
        confirmPassword: z.string(),
        about: z.string().max(200, 'Описание не может превышать 200 символов').optional(),
        instituteId: z.number().optional().nullable(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Пароли не совпадают',
        path: ['confirmPassword'],
    });

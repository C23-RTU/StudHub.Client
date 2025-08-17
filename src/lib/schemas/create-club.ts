import { z } from 'zod';

const clubSchema = z.object({
    clubName: z.string().min(1, 'Название клуба не может быть пустым').max(50, 'Макс. 50 символов'),
    about: z.string().max(255, 'Макс. 255 символов').optional(),
    comment: z.string().min(5, 'Комментарий слишком короткий').max(1000, 'Макс. 1000 символов'),
    banner: z
        .any()
        .optional()
        .refine(
            (files) =>
                !files ||
                (files instanceof FileList &&
                    (files.length === 0 || (files.length === 1 && files[0].type.startsWith('image/')))),
            { message: 'Нужно либо не загружать баннер, либо выбрать один файл-изображение' }
        ),
    avatar: z
        .any()
        .refine((files) => files instanceof FileList && files.length === 1 && files[0].type.startsWith('image/'), {
            message: 'Нужно загрузить один файл-изображение для аватара',
        }),
});
type ClubFormValues = z.infer<typeof clubSchema>;

export { type ClubFormValues, clubSchema };

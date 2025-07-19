import { z } from 'zod';

const clubSchema = z.object({
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
        .optional()
        .refine((files) => files instanceof FileList && files.length === 1 && files[0].type.startsWith('image/'), {
            message: 'Нужно загрузить один файл-изображение для аватара',
        }),
    clubName: z.string().min(1, 'Название клуба не может быть пустым').max(100, 'Макс. 100 символов'),
    description: z.string().min(10, 'Описание слишком короткое').max(1000, 'Описание слишком длинное'),
    about: z.string().min(10, 'Расскажите о себе чуть больше').max(1000, 'Слишком много текста'),
});
type ClubFormValues = z.infer<typeof clubSchema>;

export { type ClubFormValues, clubSchema };

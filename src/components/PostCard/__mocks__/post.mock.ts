import { PostDetailDTO } from '@/api/axios-client/models/post-detail-dto';

export const postMock: PostDetailDTO = {
    id: 28,
    title: 'Стенд на Дне Первокурсника',
    content:
        'Сегодня наступил долгожданный для многих День Первокурсника, в котором Клуб японской культуры принимает активное участие. На проспекте Вернадского 86 вы сможете найти нашу точку активности. Будем рады всех видеть.',
    reactionCount: 1,
    commentCount: 3,
    isUserReacted: true,
    club: {
        id: 25,
        name: 'Клуб Японской Культуры РТУ МИРЭА',
        subscriberCount: 5,
        isUserSubscribed: true,
        about: 'Мы рассказываем не только о Японии прошлого, но и о её современной масскультуре. Помимо всего прочего, вы найдёте у нас эксклюзивные материалы: различные обзоры(на игры, аниме и визуальные новеллы) и регулярные трансляции.',
        imageUrl: '6d7751d0-35fb-4d48-a597-e6b6d4f6a5a7.jpg',
        bannerUrl: 'cf75238f-6b89-4c83-930b-c572232f00b4.jpg',
    },
    postImages: ['3879e060-53a6-4a8c-92bb-4bc28ffba1e7.jpg'],
    createdAt: '2025-03-08T15:41:06',
};

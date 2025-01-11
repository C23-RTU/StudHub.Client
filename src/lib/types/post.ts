export type Post = {
    id: number;
    content: string;
    createdAt: Date;
    user: User;
    likesCount: number;
    commentsCount: number;
    tags: Array<string>;
    images?: Array<string>;
};

export type User = {
    id: number;
    name: string;
    avatarUrl?: string;
    major?: string;
    status: 'online' | 'offline';
};

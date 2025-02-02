export type Post = {
    id: number;
    title: string;
    content: string;
    // createdAt: Date;
    // user: User;
    reactionCount: number;
    club: Club;
    commentCount: number;
    tags?: Array<string>;
    postImages?: Array<string>;
};
export type Club = {
    id: number;
    name: string;
    about: string;
    imageUrl: string;
};

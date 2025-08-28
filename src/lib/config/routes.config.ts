class AuthPage {
    HOME = '/';
    EVENTS = '/events';
    PROFILE = '/profile';
    PROFILE_SETTINGS = `${this.PROFILE}/settings`;
    FINDER = '/finder';
    PROFILE_CLUBS = '/profile/clubs';
    POST_DRAFT = '/post/draft';
    PROFILE_CREATE_CLUB = `${this.PROFILE_SETTINGS}/create-club`;

    CLUBS = '/clubs';
    SETTING_CLUB =(clubId: number) => this.PROFILE_SETTINGS + `/club/${clubId}`;

    POST_COMMENTS = (id: number | string) => `/post/comments/${id}`;
    CLUB = (clubId: number | string) => `${this.CLUBS}/${clubId}`;
    CLUB_SUBSCRIBERS = (clubId: number | string) => `${this.CLUBS}/${clubId}/subscribers`;
    EVENT = (id: number | string) => `${this.EVENTS}/${id}`;
    EVENTS_CALENDAR = () => `${this.EVENTS}/calendar`;
    USER_PROFILE = (user_id: number | string) => `${this.PROFILE}/${user_id}`;

}

class PublicPage {
    AUTH = (type: 'login' | 'register' = 'login') => `/auth?type=${type}`;
}

export const AUTH_PAGE = new AuthPage();
export const PUBLIC_PAGE = new PublicPage();

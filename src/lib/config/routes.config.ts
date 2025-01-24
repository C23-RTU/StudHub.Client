class AuthPage {
    HOME = '/';
    EVENTS = '/events';
    PROFILE = '/profile';
    CLUBS = '/clubs';
    FINDER = '/finder';

    COMMENTS = (id: number | string) => `/comments/${id}`;
    CLUB_SUBSCRIBERS = (clubId: number | string) => `${this.CLUBS}/${clubId}/subscribers`;
    EVENT = (id: number | string) => `${this.EVENTS}/${id}`;
}

class PublicPage {
    AUTH = '/auth';
}

export const AUTH_PAGE = new AuthPage();
export const PUBLIC_PAGE = new PublicPage();

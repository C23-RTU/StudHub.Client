class AuthPage {
    HOME = '/';
    EVENTS = '/events';
    PROFILE = '/profile';
    CLUBS = '/clubs';
    FINDER = '/finder';
    PROFILE_CLUBS = '/profile/clubs';

    COMMENTS = (id: number | string) => `/comments/${id}`;
    CLUB = (clubId: number | string) => `${this.CLUBS}/${clubId}`;
    CLUB_SUBSCRIBERS = (clubId: number | string) => `${this.CLUBS}/${clubId}/subscribers`;
    EVENT = (id: number | string) => `${this.EVENTS}/${id}`;
}

class PublicPage {
    AUTH = (type: 'login' | 'register' = 'login') => `/auth?type=${type}`;
}

export const AUTH_PAGE = new AuthPage();
export const PUBLIC_PAGE = new PublicPage();

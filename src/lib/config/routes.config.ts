class AuthPage {
    HOME = '/';
    EVENTS = '/events';
    PROFILE = '/profile';
    CLUBS = '/clubs';
    FINDER = '/finder';

    COMMENTS = (id: number) => `/comments/${id}`;
}

class PublicPage {
    LOGIN = '/login';
    REGISTRATION = '/registration';
}

export const AUTH_PAGE = new AuthPage();
export const PUBLIC_PAGE = new PublicPage();

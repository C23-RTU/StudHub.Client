import type { AxiosResponse } from 'axios';
import { RequestCookies, ResponseCookies } from 'next/dist/server/web/spec-extension/cookies';
import { type NextRequest, NextResponse } from 'next/server';

export function applySetCookie(req: NextRequest, response: NextResponse, responseData: AxiosResponse) {
    const setCookieHeader = responseData.headers['set-cookie'];

    if (!setCookieHeader) return;

    const cookiesArray = Array.isArray(setCookieHeader) ? setCookieHeader : [setCookieHeader];

    cookiesArray.forEach((cookieStr) => {
        const parts = cookieStr.split(';').map((part) => part.trim());

        const [nameValue, ...options] = parts;
        const [name, value] = nameValue.split('=');

        const cookieOptions: Record<string, unknown> = {};

        options.forEach((option) => {
            const [optName, optValue] = option.split('=');
            const lowerOptName = optName.toLowerCase();

            switch (lowerOptName) {
                case 'path':
                    cookieOptions.path = optValue || '/';
                    break;
                case 'expires':
                    cookieOptions.expires = optValue ? new Date(optValue) : undefined;
                    break;
                case 'max-age':
                    cookieOptions.maxAge = optValue ? parseInt(optValue, 10) : undefined;
                    break;
                case 'httponly':
                    cookieOptions.httpOnly = true;
                    break;
                case 'secure':
                    cookieOptions.secure = true;
                    break;
                case 'samesite':
                    cookieOptions.sameSite = (optValue || '').toLowerCase();
                    break;
                default:
                    break;
            }
        });
        response.cookies.set(name, value, cookieOptions);
    });

    const setCookies = new ResponseCookies(response.headers);

    const newReqHeaders = new Headers(req.headers);
    const newReqCookies = new RequestCookies(newReqHeaders);
    setCookies.getAll().forEach((cookie) => newReqCookies.set(cookie));

    const dummyRes = NextResponse.next({ request: { headers: newReqHeaders } });

    dummyRes.headers.forEach((value, key) => {
        if (key === 'x-middleware-override-headers' || key.startsWith('x-middleware-request-')) {
            response.headers.set(key, value);
        }
    });
}

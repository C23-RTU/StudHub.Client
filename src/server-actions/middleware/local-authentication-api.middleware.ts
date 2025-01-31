import { NextRequest, NextResponse } from 'next/server';

export async function localAuthenticationApi(request: NextRequest) {
    console.log(request.cookies);
    const url = request.nextUrl.clone();
    const hostname = 'setka-rtu.ru';
    const requestHeaders = new Headers(request.headers);

    requestHeaders.set('host', 'https://setka-rtu.ru/api');

    url.protocol = 'https';
    url.hostname = hostname;
    url.port = '443';
    url.pathname = url.pathname;

    const response = NextResponse.rewrite(url, {
        headers: requestHeaders,
    });

    return response;
}

import { NextRequest, NextResponse } from 'next/server';

export async function localAuthenticationApi(request: NextRequest) {
    console.log('api middleware');
    const requestCookies = request.cookies;

    console.log(requestCookies);

    const url = request.nextUrl.clone();
    const hostname = '45.12.73.206';
    const requestHeaders = new Headers(request.headers);

    requestHeaders.set('host', 'https://45.12.73.206/api');

    url.protocol = 'https';
    url.hostname = hostname;
    url.port = '443';
    url.pathname = url.pathname;

    console.log(url);

    return NextResponse.rewrite(url, {
        headers: requestHeaders,
    });
}

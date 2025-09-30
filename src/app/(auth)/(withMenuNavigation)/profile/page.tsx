import { redirect } from 'next/navigation';

import { AUTH_PAGE } from '@/lib/config/routes.config';

import { getPersonIdFromToken } from '@/server-actions/actions/getPersonIdFromToken.action';

export const dynamic = 'force-dynamic';

export default async function Page() {
    const currentPerson = await getPersonIdFromToken();
    if (!currentPerson) {
        redirect('/');
    }
    redirect(AUTH_PAGE.USER_PROFILE(Number(currentPerson)));
}

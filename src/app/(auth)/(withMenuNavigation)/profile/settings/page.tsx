import type { Metadata } from 'next';
import Settings from './Settings';
import type { PersonDetailDTO } from '@/api/axios-client';
import { userApi } from '@/api/api';

export const metadata: Metadata = {
    title: 'Настройки профиля',
    description: '',
};

export default async function Page() {
    const user: PersonDetailDTO = (await userApi.userGetPersonalDetails()).data;
  return <Settings user={user}/>
}

import type { Metadata } from 'next';
import CreateClub from './CreateClub';

export const metadata: Metadata = {
    title: 'Создание клуба',
    description: '',
};

export default async function Page() {
  return <CreateClub/>
}

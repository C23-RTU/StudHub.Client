import { api } from '@/api/api';

interface Institute {
    id: number;
    name: string;
}

class institutesService {
    private _institutes = '/institutes';

    async getInstitutes(): Promise<Institute[]> {
        return (await api.get(this._institutes)).data;
    }
}

export const InstitutesService = new institutesService();

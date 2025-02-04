import { api } from '@/api/api';
import { type IInstitute } from '@/lib/types/institute.type';

class institutesService {
    private _institutes = '/institutes';

    async getInstitutes(): Promise<IInstitute[]> {
        return (await api.get(this._institutes)).data;
    }
}

export const InstitutesService = new institutesService();

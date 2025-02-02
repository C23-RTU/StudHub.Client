export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    middleName: null | string;
    birthDate: Date;
    about: string;
    instituteId: number;
    roleId: number;
    activityStatusId: number;
    imagePath: null | string;
}

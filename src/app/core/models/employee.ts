import * as types from '../enums/employee.enum';

export class Employee {
    _id?: string;
    name: string;
    surnames: string;
    job: string;
    area: types.TypeAreas;
    email: string;
    password: string;
    rol: types.TypeUsers;
    blnActivo?: String;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(){
        this.name = '',
        this.surnames = '',
        this.job = '',
        this.area = types.TypeAreas.Select,
        this.email = '',
        this.password = '',
        this.rol = types.TypeUsers.A0
    }
}

import { TypeEstatus } from "../enums/proyect.enum";

export class Proyect {
    _id?: string;
    name: string;
    description: string;
    estatus: TypeEstatus;
    dateStart: Date;
    dateEnd: Date;
    blnActivo?: Boolean;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(){
        this.name = '';
        this.description = '';
        this.estatus = TypeEstatus.En_progreso;
        this.dateStart = new Date();
        this.dateEnd = new Date();
    }
}

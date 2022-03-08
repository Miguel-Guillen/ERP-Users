import { TypeEstatus, TypePriority } from '../enums/task.enum';

export class Task {
    _id?: string;
    title: string;
    description: string;
    requeriments: string;
    priority: TypePriority;
    estatus: TypeEstatus;
    dueDate: Date;
    idProject: string;
    responsable: string;
    commentary?: string;
    info?: string;
    // evidence?: string;
    createdAt?: Date;
    updatedAt?: Date;
    blnActivo?: Boolean;

    constructor(){
        this.title = '';
        this.description = '';
        this.requeriments = '';
        this.priority = TypePriority.Select;
        this.estatus = TypeEstatus.Select;
        this.dueDate = new Date();
        this.idProject = '';
        this.responsable = '';
        this.commentary = '';
    }
}
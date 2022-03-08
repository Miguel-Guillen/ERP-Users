import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task';

@Pipe({
  name: 'task'
})
export class TaskPipe implements PipeTransform {

  transform(value: Task[], arg: string): Task[] {
    if(arg === undefined) return value;

    return value.filter((data: any) =>{
      return data.title.toLowerCase().includes(arg.toLowerCase())
    })
  }

}

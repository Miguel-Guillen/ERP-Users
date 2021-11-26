import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'employee'
})
export class EmployeePipe implements PipeTransform {

  transform(value: any, ...arg: any[]): any {
    const search = [];
    for(const s of value){
      if(s.name.toLowerCase().indexOf(arg) > -1 || 
      s.surnames.toLowerCase().indexOf(arg) > -1 ||
      s.job.toLowerCase().indexOf(arg) > -1 || 
      s.area.toLowerCase().indexOf(arg) > -1){
        search.push(s);
      }
    }
    return search;
  }

}

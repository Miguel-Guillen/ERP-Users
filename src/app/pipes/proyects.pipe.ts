import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'proyects'
})
export class ProyectsPipe implements PipeTransform {

  transform(value: any, ...arg: any): any {
    const search = [];
    for(const s of value){
      if(s.name.toLowerCase().indexOf(arg) > -1 || 
      s.type.toLowerCase().indexOf(arg) > -1 || 
      s.area.toLowerCase().indexOf(arg) > -1){
        search.push(s);
      }
    }
    return search;
  }

}

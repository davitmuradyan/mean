import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'addSpace'
})
export class AddSpacePipe implements PipeTransform {

  transform(value: string[], args?: any): any {
    return value.map(item => {
      return ' ' + item;
    });
  }

}

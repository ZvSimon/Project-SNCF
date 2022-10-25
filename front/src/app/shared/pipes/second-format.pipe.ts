import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'secondFormat'
})
export class SecondFormatPipe implements PipeTransform {

  // format data from millisecond to hours:minutes
  transform(value: number): string {
    return new Date(value * 1000).toISOString().substring(11, 16)
  }

}

import { Pipe, PipeTransform } from '@angular/core';
const MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(value: string): any {
    let date = new Date(value);
    return `${MONTH[date.getMonth() + 1]} ${date.getDate()}, ${date.getFullYear()}`
  }

}

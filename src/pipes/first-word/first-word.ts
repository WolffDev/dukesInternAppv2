import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FirstWordPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'firstWord',
})
export class FirstWordPipe implements PipeTransform {
  /**
   * Takes a value and returns 1st or 2nd string, seperated by a space - false/true as args
   * ie {{ David Wolff | firstWord:false }} -> gives last name
   */
  transform(value: string, args: boolean = true): string | boolean {
    if (value === null) return false;
    if(args) {
      return value.split(' ')[0];
    } else {
      return value.split(' ')[1];
    }
	}
}

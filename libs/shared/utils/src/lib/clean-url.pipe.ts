import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cleanUrl', standalone: true })
export class CleanUrlPipe implements PipeTransform {
  transform(value: string | undefined) {
    if (!value) {
      return '';
    }
    const result = value.trim().replaceAll('\\', '');
    return result;
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'icon',
  standalone: true
})
export class IconPipe implements PipeTransform {
  transform(word: string): string {
    return '➕ '+word;
  }
}

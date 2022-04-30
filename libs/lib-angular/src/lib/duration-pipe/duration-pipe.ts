import { Pipe, PipeTransform } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(seconds: number): string {
    const days = Math.floor(seconds / (3600 * 24));
    seconds -= days * 3600 * 24;
    const hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;
    const minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;

    return `${days} days ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [DurationPipe],
  exports: [DurationPipe],
})
export class DurationPipeModule {}

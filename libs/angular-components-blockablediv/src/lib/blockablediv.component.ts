import { Component, ElementRef, Input } from '@angular/core';
import { BlockableUI } from 'primeng/api';

@Component({
  selector: 'blockablediv',
  template: `<div [style]="style" [class]="class"><ng-content></ng-content></div>`,
})
export class BlockabledivComponent implements BlockableUI {
  @Input() style: any;
  @Input() class: any;

  constructor(private elementRef: ElementRef) {}

  getBlockableElement(): HTMLElement {
    return this.elementRef.nativeElement.children[0];
  }
}

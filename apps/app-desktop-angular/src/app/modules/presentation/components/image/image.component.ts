import { Component, Input } from '@angular/core';
import { ImageInformationModel } from '@libraries/lib-common';

@Component({
  selector: 'app-image',
  template: `<img class="image" [src]="information.src" />`,
  styles: [
    `
      :host {
        height: calc(100% - 1rem);
        width: 100%;
        display: flex;
        padding: 1rem;
      }

      .image {
        max-width: 95%;
        max-height: 95%;
        margin: auto;
        object-fit: contain;
      }
    `,
  ],
})
export class ImageComponent {
  @Input() information: ImageInformationModel;
}

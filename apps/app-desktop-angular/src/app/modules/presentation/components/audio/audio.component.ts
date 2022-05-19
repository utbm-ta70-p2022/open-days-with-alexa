import { Component, Input } from '@angular/core';
import { AudioInformationModel } from '@libraries/lib-common';

@Component({
  selector: 'app-audio',
  template: `<div>audio</div>`,
})
export class AudioComponent {
  @Input() information: AudioInformationModel;
}

import { Component, Input } from '@angular/core';
import { TextInformationModel } from '@libraries/lib-common';

@Component({
  selector: 'app-text',
  template: `<div>text</div>`,
})
export class TextComponent {
  @Input() information: TextInformationModel;
}

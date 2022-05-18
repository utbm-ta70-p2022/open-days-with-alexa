import { Injectable } from '@angular/core';
import { ImageInformationModel, information, TextInformationModel } from '@libraries/lib-common';
import { InformationNotFoundError } from '../errors/information-not-found.error copy';
import { InformationNotHandledError } from '../errors/information-not-handled.error';

@Injectable({
  providedIn: 'root',
})
export class PresentationService {
  present(id: string) {
    const item = information.find((_) => (_.id = id));
    if (!item) {
      throw new InformationNotFoundError();
    }

    if (item instanceof ImageInformationModel) {
      console.log(`display image from url: ${item.url}`);
    } else if (item instanceof TextInformationModel) {
      console.log(`display text: ${item.text}`);
    } else {
      throw new InformationNotHandledError();
    }
  }
}

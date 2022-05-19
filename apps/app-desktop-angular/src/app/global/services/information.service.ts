import { Injectable } from '@angular/core';
import { information, InformationModel } from '@libraries/lib-common';
import { InformationNotFoundError } from '../errors/information-not-found.error';

@Injectable({
  providedIn: 'root',
})
export class InformationService {
  retrieveOrFail(id: string): InformationModel {
    const informationItem = information.find((_) => _.id == id);

    if (!informationItem) {
      throw new InformationNotFoundError();
    }

    return informationItem;
  }
}

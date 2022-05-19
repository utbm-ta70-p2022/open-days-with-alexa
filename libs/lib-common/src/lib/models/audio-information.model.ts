import { InformationModel } from './information.model';

export class AudioInformationModel extends InformationModel {
  public constructor(attributes?: Partial<AudioInformationModel>) {
    super();
    Object.assign(this, attributes);
  }
}

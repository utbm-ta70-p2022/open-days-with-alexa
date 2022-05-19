import { InformationModel } from './information.model';

export class VideoInformationModel extends InformationModel {
  public constructor(attributes?: Partial<VideoInformationModel>) {
    super();
    Object.assign(this, attributes);
  }
}

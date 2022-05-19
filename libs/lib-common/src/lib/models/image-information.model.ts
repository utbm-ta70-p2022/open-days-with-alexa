import { InformationModel } from './information.model';

export class ImageInformationModel extends InformationModel {
  url: string;

  public constructor(attributes?: Partial<ImageInformationModel>) {
    super();
    Object.assign(this, attributes);
  }
}

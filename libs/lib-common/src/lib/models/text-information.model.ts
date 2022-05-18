import { InformationModel } from './information.model';

export class TextInformationModel extends InformationModel {
  text: string;

  public constructor(attributes?: Partial<TextInformationModel>) {
    super();
    Object.assign(this, attributes);
  }
}

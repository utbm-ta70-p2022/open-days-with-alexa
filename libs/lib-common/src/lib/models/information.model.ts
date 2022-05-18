export class InformationModel {
  id: string;

  public constructor(attributes?: Partial<InformationModel>) {
    Object.assign(this, attributes);
  }
}

export class InformationModel {
  id: string;

  displayDurationInSeconds = 30;

  public constructor(attributes?: Partial<InformationModel>) {
    Object.assign(this, attributes);
  }
}

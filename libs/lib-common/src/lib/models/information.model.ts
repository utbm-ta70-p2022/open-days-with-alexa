export class InformationModel {
  id: string;
  displayDurationInSeconds: number = 60;

  public constructor(attributes?: Partial<InformationModel>) {
    Object.assign(this, attributes);
  }
}

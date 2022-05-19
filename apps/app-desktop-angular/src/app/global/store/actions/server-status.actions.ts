export class Update {
  static readonly type = '[Server Status] Update';
  constructor(public connected: boolean) {}
}

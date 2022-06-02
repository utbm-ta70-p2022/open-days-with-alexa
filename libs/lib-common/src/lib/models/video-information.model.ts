import { InformationModel } from './information.model';
import { DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

export class VideoInformationModel extends InformationModel {
  src: string;

  public constructor(attributes?: Partial<VideoInformationModel>) {
    super();
    Object.assign(this, attributes);
  }
}

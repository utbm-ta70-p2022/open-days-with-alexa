import { ImageInformationModel } from '../models/image-information.model';
import { InformationModel } from '../models/information.model';
import { informationIds } from './information-ids.constant';

export const information: InformationModel[] = [
  new ImageInformationModel({
    id: informationIds.planning,
    url: 'https://www.utbm.fr/wp-content/uploads/2015/04/site-belfort.jpg',
  }),
];

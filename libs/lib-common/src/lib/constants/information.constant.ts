import { ImageInformationModel } from '../models/image-information.model';
import { InformationModel } from '../models/information.model';
import { VideoInformationModel } from '../models/video-information.model';
import { informationIds } from './information-ids.constant';

export const information: InformationModel[] = [
  new ImageInformationModel({
    id: informationIds.planning,
    src: 'assets/images/planning-1.png',
  }),
  new ImageInformationModel({ id: informationIds.cfaiPresentation }),
  new ImageInformationModel({ id: informationIds.fisaDefinition }),
  new ImageInformationModel({ id: informationIds.apprenticeshipDefinition }),
  new ImageInformationModel({ id: informationIds.eligibilityModes }),
  new ImageInformationModel({ id: informationIds.diploma }),
  new VideoInformationModel({
    id: informationIds.utbmPresentation,
    src: 'https://www.youtube.com/embed/X3smiuHIS_o?',
    displayDurationInSeconds: 60
  }),
  new VideoInformationModel({
    id: informationIds.uvVideo,
    src: 'https://www.youtube.com/embed/L8LL86iqLdg?',
    displayDurationInSeconds: 229
  }),
  new VideoInformationModel({
    id: informationIds.planningVideo,
    src: 'https://www.youtube.com/embed/sTte0Sb0CQg?',
    displayDurationInSeconds: 85
  }),
  new VideoInformationModel({
    id: informationIds.diplomaValidation,
    src: 'https://www.youtube.com/embed/bxy2btnVsMs?',
    displayDurationInSeconds: 60
  }),
];

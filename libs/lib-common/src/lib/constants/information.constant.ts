import { ImageInformationModel } from '../models/image-information.model';
import { InformationModel } from '../models/information.model';
import { VideoInformationModel } from '../models/video-information.model';
import { informationIds } from './information-ids.constant';

export const information: InformationModel[] = [
  new ImageInformationModel({
    id: informationIds.apprenticeshipDefinition,
    src: 'assets/images/apprentice.png',
  }),
  new ImageInformationModel({
    id: informationIds.cfaiPresentation,
    src: 'assets/images/cfaiPresentation.png',
  }),
  new ImageInformationModel({
    id: informationIds.ectsCredits,
    src: 'assets/images/credits.png',
  }),
  new ImageInformationModel({
    id: informationIds.eligibilityModes,
    src: 'assets/images/eligibility.png',
  }),
  new ImageInformationModel({
    id: informationIds.examen,
    src: 'assets/images/exam.png',
  }),
  new ImageInformationModel({
    id: informationIds.internationalModes,
    src: 'assets/images/international.png',
  }),
  new ImageInformationModel({
    id: informationIds.poursuiteEtude,
    src: 'assets/images/postStudies.png',
  }),
  new ImageInformationModel({
    id: informationIds.studentsOpinion,
    src: 'assets/images/studentsOpinion.png',
  }),
  new ImageInformationModel({
    id: informationIds.help,
    src: 'assets/images/help.png',
  }),
  new VideoInformationModel({
    id: informationIds.fisaDefinition,
    src: 'https://www.youtube.com/embed/bxLsgC-Vqbw?',
    displayDurationInSeconds: 240
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
    src: 'https://www.youtube.com/embed/sbbI6x4WT-M?',
    displayDurationInSeconds: 35
  }),
];

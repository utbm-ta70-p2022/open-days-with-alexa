const webserviceUrl = process.env.WEBSERVICE_PUBLIC_ORIGIN;
const folderPath = webserviceUrl + '/assets/images/';
const defaultImage = 'icon.png';

export const alexaImages = {
  apprentice: folderPath + 'apprentice.png',
  goodbye: folderPath + 'goodbye.png',
  cfai: folderPath + 'cfai-exincourt.jpg',
  diploma: folderPath + 'diploma.png',
  fisa: folderPath + 'apprentice.png',
  help: folderPath + 'help.png',
  launch: folderPath + 'icon.png',
  planning: folderPath + 'planning-icon.png',
  credits: folderPath + 'credits.jpg',
  eligibilityModes: folderPath + 'eligibility.png',
  exam: folderPath + 'exam.png',
  internationalModes: folderPath + 'international.png',
  postStudy: folderPath + 'postStudies.png',
  uv: folderPath + defaultImage,
  studentsOpinion: folderPath + 'studentsOpinion.png',
};

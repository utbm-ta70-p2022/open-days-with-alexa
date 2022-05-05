# Open days with Alexa

La solution Open days with Alexa a pour vocation d'autonomiser la présentation des informations relatives à l'UTBM aux visiteurs lors de journées portes ouvertes.

Un visiteur peut ainsi formuler une requête à un appareil Alexa afin de déclencher l'affichage d'informations sur les applications de bureau Open days with Alexa qui sont connectées.

## 1. Documentation utilisateur

### 1.1. Mise en place de la solution

1. Connecter un appareil compatible Amazon Alexa sur internet

2. Télécharger l'application de bureau Open days with Alexa pour [Linux](https://github.com/utbm-ta70-p2022/open-days-with-alexa/releases/download/latest/open-days-with-alexa-latest.AppImage), pour [Window](https://github.com/utbm-ta70-p2022/open-days-with-alexa/releases/download/latest/open-days-with-alexa-latest.exe) ou pour [macOS](https://github.com/utbm-ta70-p2022/open-days-with-alexa/releases/download/latest/open-days-with-alexa-latest.dmg)

3. Installer le fichier téléchargé

4. Lancer l'application Open days with Alexa

## 2. Documentation administrateur

### 2.1. Description de l'architecture

La solution Open days with Alexa comprend plusieurs éléments à installer :

- Un service web afin de dialoguer entre les serveurs Amazon Alexa via HTTP et l'application de bureau via websockets
- Une application de bureau pour afficher des informations vidéos, audios et textuelles dans une interface utilisateur
- Un fichier de configuration Amazon Alexa qui contient les requêtes vocales que l'utilisateur peut soumettre aux appareils Alexa

La solution utilise un environnement Node.js 16.15.0

Le code source de la solution est disponible ici : https://github.com/utbm-ta70-p2022/open-days-with-alexa

#### 2.1.1. Service web

Code source : https://github.com/utbm-ta70-p2022/open-days-with-alexa/tree/master/apps/app-webservice

##### 2.1.1.1. Construction

1. Se placer dans la racine du dépôt de code

2. Installer les dépendances : `npm install`

3. Construire le service web : `npm run nx build -- app-webservice --configuration=production`

##### 2.1.1.1 Déploiement

1. Déposer les fichiers sur le serveur de production

2. Définir les variables d'environnement suivantes :
    ```
    WEBSERVICE_JWT_SECRET=secret
    WEBSERVICE_JWT_EXPIRATION_TIME=48h
    WEBSERVICE_SCHEMA=http
    WEBSERVICE_HOST=localhost
    WEBSERVICE_PORT=3333
    WEBSERVICE_NAME=Open days with Alexa Api
    WEBSERVICE_ALLOWED_ORIGINS=*
    ```

3. Lancer le service web : `node dist/apps/app-webservice/main.js

#### 2.1.2. Application de bureau

Code source : 
    - https://github.com/utbm-ta70-p2022/open-days-with-alexa/tree/master/apps/app-desktop-angular
    - https://github.com/utbm-ta70-p2022/open-days-with-alexa/tree/master/apps/app-desktop-electron

##### 2.1.2.1. Construction

1. Se placer dans la racine du dépôt de code

2. Installer les dépendances : `npm install`

3. Construire l'installateur : 
   - Pour Linux `npm run publish:linux`
   - Pour Windows `npm run publish:windows`
   - Pour macOS `npm run publish:macos`

##### 2.1.2.1 Installation

1. Exécuter l'installateur situé dans le dossier `dist/executables/app.exe`

#### 2.1.3. Fichier de configuration Amazon Alexa

Code source : https://github.com/utbm-ta70-p2022/open-days-with-alexa/blob/master/libs/lib-common/src/assets/amazon-alexa-skills/skills.json

##### 2.1.3.1 Déploiement

1. Installer ASK cli : `npm install --global ask-cli@2.27.0`

2. Configurer la connexion avec un compte Amazon Alexa Developer `ask configure`
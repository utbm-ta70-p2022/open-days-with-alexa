# Open days with Alexa

La solution Open days with Alexa a pour vocation de rendre autonome la présentation des informations relatives à l'UTBM aux visiteurs lors de journées portes ouvertes.

Un visiteur peut ainsi formuler une requête à un appareil Alexa afin de déclencher l'affichage d'informations sur les applications de bureau Open days with Alexa qui sont connectées.

> Crédits : BARDET Benjamin, BERTRAND Loïc, DELIGNOU Quentin, DUPORT Anthony, LEDOYEN Baptiste, LEMESTRE Malo, LUNG Axel, PINON Matthis, VIENNET Joris dans le cadre d'un projet dans la formation ingénierie des systèmes d'information sous statut apprenti de l'UTBM en 2022


## 1. Documentation utilisateur

### 1.1. Mise en place de la solution

1. Connecter un appareil compatible Amazon Alexa sur internet

2. Télécharger l'application de bureau Open days with Alexa :
   - [Télécharger pour Linux](https://github.com/utbm-ta70-p2022/open-days-with-alexa/releases/download/latest/open-days-with-alexa-latest.AppImage)
   - [Télécharger pour Window](https://github.com/utbm-ta70-p2022/open-days-with-alexa/releases/download/latest/open-days-with-alexa-latest.exe)
   - [Télécharger pour macOS](https://github.com/utbm-ta70-p2022/open-days-with-alexa/releases/download/latest/open-days-with-alexa-latest.dmg)

3. Installer le fichier téléchargé

4. Lancer l'application Open days with Alexa

5. Tester la configuration en effectuant les requêtes vocales suivantes à Alexa : 
  - `Alexa informe-moi` 
  - `Test configuration`

## 2. Documentation administrateur

### 2.1. Description de l'architecture

La solution Open days with Alexa comprend plusieurs éléments à installer :

- Un service web afin de dialoguer entre les serveurs Amazon Alexa via HTTP et l'application de bureau via websockets
- Une application de bureau pour afficher des informations vidéos, audios et textuelles dans une interface utilisateur
- Un fichier de configuration Amazon Alexa qui contient les requêtes vocales que l'utilisateur peut soumettre aux appareils Alexa

La solution utilise un environnement Node.js 16.15.0

Liens utiles :
- [Code source de la solution](https://github.com/utbm-ta70-p2022/open-days-with-alexa)
- [Rapport de qualité du code source de la solution](https://sonarcloud.io/summary/new_code?id=utbm-ta70-p2022_open-days-with-alexa)

#### 2.1.1. Service web

##### 2.1.1.1. Construction

1. Se placer dans la racine du dépôt de code

2. Installer les dépendances : `npm install`

3. Construire le service web : `npm run nx build -- app-webservice --configuration=production`

##### 2.1.1.2. Déploiement

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

##### 2.1.2.1. Construction

1. Se placer dans la racine du dépôt de code

2. Installer les dépendances : `npm install`

3. Construire l'installateur : 
   - Pour Linux `npm run publish:linux`
   - Pour Windows `npm run publish:windows`
   - Pour macOS `npm run publish:macos`

##### 2.1.2.2. Installation

1. Exécuter l'installateur situé dans le dossier `dist/executables/app.exe`

#### 2.1.3. Fichier de configuration Amazon Alexa

##### 2.1.3.1. Déploiement

1. Installer ASK cli : `npm install --global ask-cli@2.27.0`

2. Configurer la connexion avec un compte Amazon Alexa Developer `ask configure`

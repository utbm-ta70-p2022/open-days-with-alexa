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
    WEBSERVICE_HOST=localhost
    WEBSERVICE_PORT=3333
    WEBSERVICE_NAME=Open days with Alexa Api
    WEBSERVICE_ALLOWED_ORIGIN=*
    WEBSERVICE_PUBLIC_ORIGIN=http://localhost:3333
    ```

3. Lancer le service web : `node dist/apps/app-webservice/main.js`

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

1. Se créer un compte Amazon Alexa Developper : <https://developer.amazon.com/alexa/console/ask>

2. Se créer un compte AWS (Amazon Web Services) : <https://aws.amazon.com/fr/>

3. Suivre les instructions pour créer un utilisateur IAM : <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html#id_users_create_cliwpsapi>
⚠️ Bien enregistrer les **access key ID** et **secret access key** ⚠️

4. Installer ASK cli : `npm install --global ask-cli@2.27.0`

5. Configurer ASK cli :
    - Exécuter la commande `ask configure` dans un terminal
    - Se connecter avec son compte Amazon Alexa Developper puis suivre les instructions
    - Associer son compte AWS
    - Renseigner les identifiants de l'étape **3.** (*AWS Access Key ID* et *AWS Secret Access Key*)
    - Enregistrer le **Vendor ID**

6. Générer des identifiants de connexion :
    - Exécuter la commande `ask util generate-lwa-tokens` dans un terminal
    - Se connecter avec son compte Amazon Alexa Developper puis suivre les instructions
    - Enregistrer les valeurs **access_token** et **refresh_token**

7. Créer une nouvelle skill en allant sur le site :
    - Aller sur le site <https://developer.amazon.com/alexa/console/ask> et cliquer sur **Créer une skill**
    - Ajouter un nom
    - Sélectionner le langage **Français (FR)**
    - Sélectionner le modèle *custom* et l'hébergement *personnalisé*
    - Valider puis choisir le template *Commencer à partir de zéro*
    - Attendre la fin de la construction du modèle puis aller dans le menu **Endpoint**
    - Enregistrer la valeur **Skill ID**

8. Mettre à jour le modèle d'interaction JSON :
    - Ouvrir un terminal dans le dossier où se trouve le modèle d'interaction
    - Exécuter la commande `ask smapi set-interaction-model -s ${SKILL ID} -l fr-FR --interaction-model file:${FILENAME}`

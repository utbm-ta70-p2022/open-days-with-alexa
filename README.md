**Open days with Alexa**

[[_TOC_]]

# 1. Généralités

La solution « Open days with Alexa » a pour vocation d'automatiser la présentation des informations relatives à l'UTBM aux visiteurs.

## 1.1. Équipe de développement

**Projet Présentation**

* BERTRAND Loïc
* DELIGNOU Quentin
* LUNG Axel
* VIENNET Joris

**Projet Alexa**

* BARDET Benjamin
* DUPORT Anthony
* LEDOYEN Baptiste
* LEMESTRE Malo
* PINON Matthis

## 1.2. Stack technologique

- Environnement de développement multi-plateformes : [Electron](https://www.electronjs.org/)
- Langage de programmation : [TypeScript](https://www.typescriptlang.org/)
- Plateforme logicielle : [Node.js](https://nodejs.org/)
- Workspace : [Nx workspace](https://nx.dev/)
- Framework frontend : [Angular](https://angular.io/)
- Bibliothèque de composants Angular : [PrimeNG](https://primefaces.org/primeng/showcase)
- Gestion des états Angular : [NGXS](https://www.ngxs.io/)
- Framework  CSS : [PrimeFlex](https://www.primefaces.org/primeflex/display)
- Pack d'icônes : [Font Awesome](https://fontawesome.com/)

## 1.3. Présentation de l'architecture

La solution est organisée par un espace de travail Nx tel que l'arborescence présentée ci-dessous :

```
/
|--/apps
   |--/app-angular
   |--/app-electron
|--/libs
```

**app-angular**

Ce projet d'application Angular contient le code source des différentes interfaces web.

**app-electron**

Ce projet d'application Electron contient le code source qui permet d'encapsuler l'application web dans une fenêtre du système d'exploitation.

# 2. Règles de développement

## 2.1. Type des issues

Il existe 4 types d'issues :

* **User story** : Demande de fonctionnalité formulée tel que : « En tant que x, je souhaite x »
* **Documentation** : Demande de documentation
* **Bug** : Demande de résolution de bug
* **Technical story** : Tâche technique autre

> NB : Ticket = Issue

## 2.2. Procédure d'implémentation d'une issue

1. Se rendre sur la liste des issues du projet :

   * Projet Présentation : https://github.com/utbm-ta70-presentation-alexa/open-days-with-alexa/projects/2
   * Projet Alexa : https://github.com/utbm-ta70-presentation-alexa/open-days-with-alexa/projects/1

2. Regarder dans la colonne de l'itération courante en se référant aux plages de dates indiquées dans le titre des colonnes

   > Exemple : « Itération 1 : 27/04 - 01/05 »

3. Prendre une issue non déjà marquée comme « ouvert »

4. Créer une nouvelle branche de développement depuis la branche `master` selon la nomenclature suivante : `issue/<numéro de l'issue>-<quelques mots décrivant l'issue>`

   > Pour se placer dans la branche `master` : `git checkout master`
   >
   > Pour créer une nouvelle branche : `git checkout -b issue/123-lorem-ipsum`

5. Traiter l'issue

   > Ne pas hésiter à traiter l'issue en binôme si cela semble nécessaire.

6. Ajouter les fichiers au versionnement, les commiter et pousser la branche finalisée vers le dépôt de code

   > Pour ajouter les fichiers au versionnement : `git add <nom du fichier>`
   >
   > Pour commiter les fichiers : `git commit -m "<en anglais : verbe d'action à l'infinitif + description>"`
   >
   > Pour pousser la branche : `git push origin issue/123-lorem-ipsum `

7. Créer une demande de fusion de la branche de développement depuis l'onglet « Pull Requests » du dépôt de code GitHub 

   > À la création d'une demande de branche, la qualité du code est analysé.
   >
   > Lien vers l'onglet « Pull Requests » : https://github.com/utbm-ta70-presentation-alexa/open-days-with-alexa/pulls

8. Faire relire son code par un autre membre de l'équipe

9. Procéder à la fusion de la branche de développement vers la branche `master` en cliquant sur le bouton « Merge pull request » de la « Pull request » précédemment créée

10. Clôturer l'issue

    > Pour cloturer une issue, il faut cliquer sur son titre pour l'ouvrir, puis cliquer sur le bouton « Close issue »

## 2.3. Conventions de nommage

### 2.3.1 TypeScript

| Élément            | Casse      |
| ------------------ | ---------- |
| Classe d'objet     | PascalCase |
| Classe d'interface | PascalCase |
| Fichier            | kebab-case |
| Variable           | camelCase  |

# 3. Installation de l'environnement de développement

## 3.1. Installation des prérequis

**Installer Java 11**

* Pour Windows, télécharger et installer le fichier suivant : https://aka.ms/download-jdk/microsoft-jdk-17.0.2.8.1-windows-x64.msi
* Pour macOS, télécharger et installer le fichier suivant : https://aka.ms/download-jdk/microsoft-jdk-17.0.2.8.1-macOS-x64.pkg

**Installer Node.js 16.15.0**

* Pour Windows, télécharger et installer le fichier suivant : https://nodejs.org/dist/v16.15.0/node-v16.15.0-x64.msi
* Pour macOS, télécharger et installer le fichier suivant : https://nodejs.org/dist/v16.15.0/node-v16.15.0.pkg


## 3.2. Installation des outils de développement

### Visual Studio Code

**Installer l'IDE**

* Pour Windows, télécharger et installer le fichier suivant : https://az764295.vo.msecnd.net/stable/dfd34e8260c270da74b5c2d86d61aee4b6d56977/VSCodeUserSetup-x64-1.66.2.exe
* Pour macOS, télécharger et installer le fichier suivant : https://az764295.vo.msecnd.net/stable/dfd34e8260c270da74b5c2d86d61aee4b6d56977/VSCode-darwin-universal.zip

**Installer les extensions**

* [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
* [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
* [SonarLint](https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode)
* [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)
* [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)

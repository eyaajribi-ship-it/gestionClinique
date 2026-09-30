# GestionClinique

Application web de gestion d'une clinique, développée dans le cadre de ma
Licence en Technologie de l'Informatique (ISET Zaghouan).
Elle se compose d'une API REST (Spring Boot) et d'une interface Angular.

## Technologies
- **Backend** : Java 17, Spring Boot, Spring Data JPA / Hibernate,
  Spring Security, MySQL
- **Frontend** : Angular 20, Angular Material

## Fonctionnalités
- Authentification (connexion et inscription)
- Gestion des patients
- Gestion des médecins
- Gestion des spécialités
- Gestion des rendez-vous
- Informations sur la clinique et tableau de bord

## Structure du projet
```
backend/    API REST Spring Boot (port 8082)
frontend/   Interface Angular (port 4200)
```

## Lancer le projet

### Prérequis
- Java 17, Node.js et npm, MySQL (par exemple via XAMPP)

### Backend
1. Démarrer MySQL.
2. Dans le dossier `backend` : `./mvnw spring-boot:run`

La base `gestion_clinique` est créée automatiquement au premier lancement.
La configuration (utilisateur `root`, sans mot de passe) est celle d'un
environnement de développement local : `backend/src/main/resources/application.properties`.

### Frontend
1. Dans le dossier `frontend` : `npm install`
2. Puis : `ng serve`
3. Ouvrir http://localhost:4200

## Auteure
Eya Jeribi, étudiante en Licence Technologie de l'Informatique, ISET Zaghouan
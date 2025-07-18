# CryptoBoost - Documentation Technique

CryptoBoost est une plateforme d'investissement automatisée qui utilise des bots d'arbitrage pour générer des revenus passifs pour ses utilisateurs. Ce document fournit toutes les informations nécessaires pour comprendre, installer, et continuer le développement de l'application.

## 🎯 MVP (Produit Minimum Viable)

Le MVP de CryptoBoost se concentre sur le cycle de vie complet de l'investissement, de l'inscription de l'utilisateur à la gestion par l'administrateur.

-   **Flux Utilisateur** :
    1.  Un utilisateur peut s'inscrire et se connecter.
    2.  Il accède à un tableau de bord pour voir ses fonds.
    3.  Il peut initier un **dépôt** en cryptomonnaie.
    4.  Une fois le dépôt approuvé par un admin, il peut choisir un **plan d'investissement**.
    5.  Après approbation de l'investissement, il voit ses **gains simulés** augmenter en temps réel.
    6.  Il peut demander un **retrait** de son capital et de ses bénéfices.

-   **Flux Administrateur** :
    1.  L'admin se connecte à un panneau dédié.
    2.  Il peut **gérer tous les utilisateurs** (bannir, promouvoir, etc.).
    3.  Il doit **approuver ou rejeter** les dépôts, les investissements et les retraits soumis par les utilisateurs.
    4.  Il configure les **adresses de portefeuille** pour les dépôts.

## 🛠️ Dépendances et Technologies

-   **Build Tool** : **Vite** - Pour un environnement de développement rapide et des builds optimisés.
-   **Framework Frontend** : **React 18.2.0** - Pour construire l'interface utilisateur.
-   **Styling** :
    -   **TailwindCSS** : Framework CSS "utility-first" pour un design rapide et sur-mesure.
    -   **shadcn/ui** : Collection de composants d'interface réutilisables et accessibles.
    -   **Framer Motion** : Pour des animations fluides et complexes.
-   **Icônes** : **Lucide React** - Bibliothèque d'icônes légère et cohérente.
-   **Base de Données & Backend** : **Supabase**
    -   **Authentication** : Gère l'inscription et la connexion des utilisateurs.
    -   **PostgreSQL Database** : Stockage des données (utilisateurs, transactions, etc.).
    -   **Realtime** : Pour des mises à jour en temps réel (notifications futures).
-   **Gestion de l'état (local)** : Le projet utilise actuellement `localStorage` comme solution de prototypage. **La migration vers Supabase est la prochaine étape critique.**

## 🚀 Installation et Configuration

Suivez ces étapes pour lancer le projet sur votre machine locale.

### Prérequis
-   Node.js (version 20 ou supérieure)
-   Un compte Supabase

### 1. Installation des dépendances
L'environnement gère cette étape automatiquement. Sinon, exécutez :
```bash
npm install
```

### 2. Configuration de l'environnement
Le projet nécessite des clés d'API Supabase pour se connecter à la base de données. Ces clés sont injectées automatiquement dans l'environnement de développement.

### 3. Lancer le serveur de développement
L'environnement exécute cette commande pour vous. Pour un lancement manuel :
```bash
npm run dev
```
L'application sera accessible sur le port `5173` : `http://localhost:5173`.

## 🗄️ Schéma de la Base de Données (Supabase)

La base de données est organisée autour de 5 tables principales dans le schéma `public`.

### `profiles`
Stocke les informations publiques et les données financières de chaque utilisateur. Lié à la table `auth.users` par l'ID.

| Colonne           | Type      | Description                                      |
|-------------------|-----------|--------------------------------------------------|
| `id` (PK)         | `uuid`    | Référence l'ID de `auth.users`.                  |
| `email`           | `text`    | Email de l'utilisateur.                          |
| `role`            | `text`    | Rôle de l'utilisateur (`client` ou `admin`).     |
| `banned`          | `boolean` | `true` si l'utilisateur est banni.               |
| `capital`         | `numeric` | Capital disponible pour investir.                |
| `benefits`        | `numeric` | Bénéfices générés.                               |
| `total_capital`   | `numeric` | Somme du capital et des bénéfices.               |
| `invested_capital`| `numeric` | Capital actuellement dans un plan actif.         |
| `...`             |           |                                                  |

### `deposits`
Enregistre chaque demande de dépôt faite par un utilisateur.

| Colonne      | Type       | Description                                      |
|--------------|------------|--------------------------------------------------|
| `id` (PK)    | `bigint`   | Identifiant unique du dépôt.                     |
| `user_id`    | `uuid`     | ID de l'utilisateur qui fait le dépôt.           |
| `amount`     | `numeric`  | Montant du dépôt.                                |
| `crypto_type`| `text`     | Type de cryptomonnaie (ex: `BTC`, `ETH`).        |
| `status`     | `text`     | Statut (`pending`, `approved`, `rejected`).      |
| `created_at` | `timestamp`| Date de création.                                |

### `investments`
Enregistre chaque plan d'investissement souscrit par un utilisateur.

| Colonne               | Type       | Description                                      |
|-----------------------|------------|--------------------------------------------------|
| `id` (PK)             | `bigint`   | Identifiant unique de l'investissement.          |
| `user_id`             | `uuid`     | ID de l'utilisateur.                             |
| `plan_name`           | `text`     | Nom du plan (ex: `Starter`, `Pro`).              |
| `price`               | `numeric`  | Montant investi.                                 |
| `final_profit_target` | `numeric`  | Objectif de gain final défini par l'admin.       |
| `status`              | `text`     | Statut (`pending`, `active`, `completed`).       |
| `is_complete`         | `boolean`  | `true` si le cycle de 4h est terminé.            |
| `created_at`          | `timestamp`| Date de création.                                |

### `withdrawals`
Enregistre chaque demande de retrait.

| Colonne      | Type       | Description                                      |
|--------------|------------|--------------------------------------------------|
| `id` (PK)    | `bigint`   | Identifiant unique du retrait.                   |
| `user_id`    | `uuid`     | ID de l'utilisateur.                             |
| `amount`     | `numeric`  | Montant demandé.                                 |
| `tax`        | `numeric`  | Frais de performance (3%).                       |
| `address`    | `text`     | Adresse crypto pour le paiement.                 |
| `status`     | `text`     | Statut (`pending`, `approved`, `rejected`).      |
| `admin_note` | `text`     | Note de l'admin visible par l'utilisateur.       |
| `created_at` | `timestamp`| Date de création.                                |

### `app_settings`
Stocke les configurations globales de l'application, comme les adresses de portefeuille.

| Colonne | Type    | Description                                      |
|---------|---------|--------------------------------------------------|
| `key`   | `text`  | Clé de la configuration (ex: `deposit_addresses`).|
| `value` | `jsonb` | Valeur de la configuration (objet JSON).         |

## 🛣️ Prochaines Étapes

La priorité absolue est de finaliser la migration de `localStorage` vers **Supabase** pour toutes les opérations de données. Consulter `TODO.md` pour une liste détaillée des tâches.
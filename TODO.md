# To-Do List & État du MVP - CryptoBoost

Ce document résume l'état actuel du développement de l'application CryptoBoost, en identifiant les fonctionnalités complétées, celles en cours, et les prochaines étapes cruciales.

---

## ✅ Éléments Développés (Fonctionnels)

Ces fonctionnalités sont en place et forment le socle de l'application.

-   **Système d'Authentification Complet** :
    -   [x] Inscription des utilisateurs.
    -   [x] Connexion / Déconnexion.
    -   [x] Session utilisateur persistante (via `localStorage`).
    -   [x] Création automatique de comptes administrateur au démarrage.

-   **Tableau de Bord Utilisateur (Dashboard)** :
    -   [x] Vue d'ensemble des capitaux (investi, bénéfices, total).
    -   [x] Navigation par onglets (Portefeuille, Plans, Avis, Trading).
    -   [x] Affichage dynamique des gains en temps réel (simulation côté client).

-   **Gestion de Portefeuille (CryptoWallet)** :
    -   [x] Fonctionnalités de dépôt et de retrait.
    -   [x] Historique des transactions (dépôts, retraits, investissements).
    -   [x] Affichage des adresses de dépôt par cryptomonnaie (BTC, ETH, SOL).
    -   [x] Logique de frais de performance de 3% sur les retraits.

-   **Plans d'Investissement** :
    -   [x] Affichage des différents plans (Starter, Pro, Expert).
    -   [x] Processus de sélection d'un plan.
    -   [x] Double méthode de paiement : utilisation du capital total disponible ou par dépôt crypto.

-   **Panneau Administrateur (Admin Panel)** :
    -   [x] **Gestion des utilisateurs** : Lister, bannir/débannir, promouvoir/rétrograder, supprimer, et gérer les fonds manuellement.
    -   [x] **Validation des Dépôts** : Approuver ou rejeter les dépôts en attente.
    -   [x] **Gestion des Investissements** : Approuver, rejeter ou stopper les plans d'investissement.
    -   [x] **Gestion des Retraits** : Approuver ou rejeter les demandes de retrait et ajouter des notes.
    -   [x] **Configuration des Adresses** : Définir les adresses de dépôt et de paiement des frais.

-   **Interface et Expérience Utilisateur (UI/UX)** :
    -   [x] Page d'accueil (Landing Page) complète et engageante.
    -   [x] Composants UI modernes (shadcn/ui) et animations (Framer Motion).
    -   [x] Notifications (Toasts) pour les actions importantes.
    -   [x] Ticker de transactions simulées.
    -   [x] Section "Avis Clients" et "Live Trading".
    -   [x] Boutons de contact Telegram.

---

## ⚠️ Éléments Partiellement Développés (À améliorer)

Ces fonctionnalités sont présentes mais nécessitent une consolidation pour être prêtes pour la production.

-   **Persistance des Données** :
    -   [ ] **Problème** : L'application repose entièrement sur `localStorage`. C'est **fragile, non sécurisé, et non synchronisé** entre les appareils.
    -   [ ] **Solution** : Migrer toute la logique de données vers **Supabase**. Les fichiers de contexte (`SupabaseAuthContext.jsx`) et de client (`customSupabaseClient.js`) existent mais ne sont pas encore intégrés dans le flux principal de l'application.

-   **Logique de Calcul des Gains** :
    -   [ ] **Problème** : Le calcul des bénéfices se fait via `setInterval` dans le navigateur de l'utilisateur. Si l'utilisateur ferme l'onglet, le calcul s'arrête.
    -   [ ] **Solution** : Déplacer cette logique côté serveur, par exemple avec une **fonction Edge ou un Cron Job Supabase**, pour garantir la fiabilité et la persistance des calculs.

-   **Sécurité des Identifiants Admin** :
    -   [ ] **Problème** : Les mots de passe des administrateateurs sont stockés en clair dans le code (`useAuth.js`).
    -   [ ] **Solution** : Ce problème sera résolu nativement lors de la migration vers le système d'authentification de Supabase.

---

## 📊 État Détaillé des Fonctionnalités par Rôle

### 👤 Rôle Client

#### Page d'Accueil (Non connecté)
-   **Menu de navigation** :
    -   `Bouton Connexion` : ✅ Totalement développé.
-   **Section Héros** :
    -   `Bouton Lancer mon premier bot` : ✅ Totalement développé (scroll vers les plans).
    -   `Bouton Découvrir comment ça marche` : ✅ Totalement développé (scroll vers la section).
-   **Section Plans d'Investissement** :
    -   `Bouton Choisir ce Plan` : ✅ Totalement développé (ouvre la modale de connexion).
-   **Section Trading en Direct** :
    -   `Graphique TradingView` : ✅ Totalement développé.
    -   `Actualités du marché` : ✅ Totalement développé (statique).
-   **Pied de page** :
    -   `Boutons Telegram` : ✅ Totalement développé (liens externes).

#### Tableau de Bord (Connecté)
-   **Menu Principal** :
    -   `Boutons Telegram` : ✅ Totalement développé.
    -   `Bouton Déconnexion` : ✅ Totalement développé.
-   **Navigation par Onglets** :
    -   `Onglet Portefeuille` : ✅ Totalement développé.
    -   `Onglet Plans` : ✅ Totalement développé.
    -   `Onglet Avis` : ✅ Totalement développé.
    -   `Onglet Trading` : ✅ Totalement développé.
-   **Onglet Portefeuille (`CryptoWallet.jsx`)** :
    -   `Bouton Déposer du Capital` : ✅ Totalement développé (crée une demande de dépôt).
    -   `Bouton Effectuer un Retrait` : ✅ Totalement développé (crée une demande de retrait).
    -   `Historique des transactions` : ✅ Totalement développé (affiche les données de `localStorage`).
-   **Onglet Plans (`InvestmentPlans.jsx`)** :
    -   `Bouton Choisir ce Plan` : ✅ Totalement développé (ouvre la modale de paiement).
    -   `Modale de Paiement` :
        -   `Tab Déposer Crypto` : ✅ Totalement développé.
        -   `Tab Utiliser Capital Total` : ✅ Totalement développé.
        -   `Bouton de confirmation` : ✅ Totalement développé (crée une demande d'investissement).

### 🛡️ Rôle Administrateur

#### Panneau d'Administration (`AdminPanel.jsx`)
-   **Navigation par Onglets** :
    -   `Onglet Clients` : ✅ Totalement développé.
    -   `Onglet Dépôts` : ✅ Totalement développé.
    -   `Onglet Investissements` : ✅ Totalement développé.
    -   `Onglet Retraits` : ✅ Totalement développé.
-   **Onglet Clients** :
    -   `Liste des utilisateurs` : ✅ Totalement développé.
    -   `Menu Actions (par utilisateur)` :
        -   `Bouton Gérer les fonds` : ✅ Totalement développé.
        -   `Bouton Bannir/Débannir` : ✅ Totalement développé.
        -   `Bouton Promouvoir/Rétrograder` : ✅ Totalement développé.
        -   `Bouton Supprimer` : ✅ Totalement développé.
-   **Onglet Dépôts** :
    -   `Liste des dépôts en attente` : ✅ Totalement développé.
    -   `Bouton Approuver` : ✅ Totalement développé.
    -   `Bouton Rejeter` : ✅ Totalement développé.
-   **Onglet Investissements** :
    -   `Liste des investissements` : ✅ Totalement développé.
    -   `Bouton Approuver` : ✅ Totalement développé (ouvre la modale de profit).
    -   `Bouton Rejeter` : ✅ Totalement développé.
    -   `Bouton Stopper` : ✅ Totalement développé.
-   **Onglet Retraits** :
    -   `Liste des retraits en attente` : ✅ Totalement développé.
    -   `Bouton Approuver` : ✅ Totalement développé.
    -   `Bouton Rejeter` : ✅ Totalement développé.
    -   `Bouton Noter` : ✅ Totalement développé (permet d'ajouter une note au client).
-   **Section Adresses de Dépôt & Frais** :
    -   `Champs de saisie des adresses` : ✅ Totalement développé.
    -   `Bouton Sauvegarder` : ✅ Totalement développé.

---

## ❌ Éléments Non Développés (À faire)

Fonctionnalités importantes à ajouter pour une application complète.

-   [ ] **Intégration Complète de Supabase** : Remplacer le hook `useAuth.js` et toutes les interactions avec `localStorage` par des appels à l'API Supabase pour une gestion centralisée et sécurisée des données.
-   [ ] **Réinitialisation de Mot de Passe** : Implémenter une fonctionnalité "mot de passe oublié".
-   [ ] **Notifications en Temps Réel** : Utiliser Supabase Realtime pour notifier les utilisateurs instantanément (ex: approbation d'un dépôt) sans qu'ils aient à recharger la page.
-   [ ] **Validation des Données** : Ajouter une validation plus stricte pour les entrées utilisateur (ex: format des adresses crypto).
-   [ ] **Pagination** : Pour les listes dans le panneau admin (utilisateurs, transactions) afin de maintenir les performances avec un grand volume de données.
-   [ ] **Tests** : Mettre en place des tests unitaires et d'intégration pour assurer la stabilité de l'application.

---

## 🔧 Éléments Manquants pour un Bon Fonctionnement (Critique)

Ces points sont **essentiels** pour la viabilité, la sécurité et la scalabilité de l'application.

-   **Migration vers une Base de Données Réelle (Supabase)** :
    -   **Priorité absolue.** Sans cela, l'application reste au stade de prototype non fonctionnel en conditions réelles.

-   **Logique Métier Côté Serveur** :
    -   Le calcul des gains et la validation des transactions doivent être gérés par un backend (fonctions Supabase) pour être fiables et sécurisés.

-   **Sécurisation des Données Sensibles** :
    -   Les adresses de dépôt et de frais ne doivent pas être gérées via `localStorage`. Elles doivent être stockées de manière sécurisée dans la base de données et accessibles uniquement par les administrateurs.
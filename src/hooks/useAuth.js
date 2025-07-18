
// import { useState, useEffect, useCallback } from 'react';
// import { toast } from '@/components/ui/use-toast';

// const useAuth = () => {
//   const [user, setUser] = useState(null);
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const ensureUserValues = (user) => {
//     return {
//       ...user,
//       capital: user.capital || 0,
//       benefits: user.benefits || 0,
//       totalCapital: user.totalCapital || 0,
//       investedCapital: user.investedCapital || 0,
//       totalDeposited: user.totalDeposited || 0,
//     };
//   };

//   const loadData = useCallback(() => {
//     setLoading(true);
//     try {
//       let storedUsers = JSON.parse(localStorage.getItem('users') || '[]').map(ensureUserValues);
      
//       const adminAccounts = [
//         { email: 'louiscrypto1234@gmail.com', password: 'pavrat5678' },
//         { email: 'julienlerois@gmail.com', password: 'pavrat5678' }
//       ];

//       let usersModified = false;
//       adminAccounts.forEach(adminInfo => {
//         let admin = storedUsers.find(u => u.email === adminInfo.email);
//         if (!admin) {
//           admin = { ...adminInfo, role: 'admin', approved: true, banned: false, capital: 0, benefits: 0, totalCapital: 0, investedCapital: 0, totalDeposited: 0 };
//           storedUsers.push(admin);
//           usersModified = true;
//         } else {
//           if (admin.role !== 'admin' || admin.password !== adminInfo.password) {
//             admin.role = 'admin';
//             admin.password = adminInfo.password;
//             usersModified = true;
//           }
//         }
//       });
      
//       if (usersModified) {
//         localStorage.setItem('users', JSON.stringify(storedUsers.map(ensureUserValues)));
//       }
      
//       setUsers(storedUsers);

//       const sessionUserEmail = JSON.parse(localStorage.getItem('sessionUserEmail'));
//       if (sessionUserEmail) {
//         const fullUser = storedUsers.find(u => u.email === sessionUserEmail);
//         if (fullUser && fullUser.approved && !fullUser.banned) {
//           setUser(ensureUserValues(fullUser));
//         } else {
//           localStorage.removeItem('sessionUserEmail');
//           setUser(null);
//         }
//       }
//     } catch (error) {
//       console.error("Erreur lors du chargement des données:", error);
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     loadData();
    
//     const handleStorageChange = (event) => {
//       if (event.key === 'users' || event.key === 'sessionUserEmail') {
//         loadData();
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, [loadData]);

//   const login = (email, password) => {
//     const allUsers = JSON.parse(localStorage.getItem('users') || '[]').map(ensureUserValues);
//     const userToLogin = allUsers.find(u => u.email === email && u.password === password);
//     if (userToLogin) {
//       if (userToLogin.banned) {
//         toast({ variant: 'destructive', title: 'Compte Banni', description: 'Votre compte a été temporairement suspendu.' });
//         return false;
//       }
//       setUser(ensureUserValues(userToLogin));
//       localStorage.setItem('sessionUserEmail', JSON.stringify(userToLogin.email));
//       toast({ title: 'Connexion réussie!', description: `Bienvenue, ${userToLogin.email}` });
//       return true;
//     }
//     toast({ variant: 'destructive', title: 'Échec de la connexion', description: 'Email ou mot de passe incorrect.' });
//     return false;
//   };

//   const register = (email, password) => {
//     const allUsers = JSON.parse(localStorage.getItem('users') || '[]').map(ensureUserValues);
//     if (allUsers.some(u => u.email === email)) {
//       toast({ variant: 'destructive', title: 'Erreur', description: 'Cet email est déjà utilisé.' });
//       return false;
//     }
//     const newUser = { email, password, role: 'client', approved: true, banned: false, capital: 0, benefits: 0, totalCapital: 0, investedCapital: 0, totalDeposited: 0 };
//     const updatedUsers = [...allUsers, ensureUserValues(newUser)];
//     localStorage.setItem('users', JSON.stringify(updatedUsers.map(ensureUserValues)));
//     setUsers(updatedUsers);
//     toast({ title: 'Inscription réussie!', description: 'Vous pouvez maintenant vous connecter.' });
//     return true;
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('sessionUserEmail');
//     toast({ title: 'Déconnexion', description: 'Vous avez été déconnecté.' });
//   };
  
//   const updateUser = (updatedUser) => {
//     const sanitizedUser = ensureUserValues(updatedUser);
//     if (user && user.email === sanitizedUser.email) {
//       setUser(sanitizedUser);
//     }
//     const allUsers = JSON.parse(localStorage.getItem('users') || '[]').map(ensureUserValues);
//     const updatedUsers = allUsers.map(u => u.email === sanitizedUser.email ? sanitizedUser : u);
//     localStorage.setItem('users', JSON.stringify(updatedUsers.map(ensureUserValues)));
//     setUsers(updatedUsers);
//   };

//   const deleteUser = (email) => {
//     let allUsers = JSON.parse(localStorage.getItem('users') || '[]').map(ensureUserValues);
//     allUsers = allUsers.filter(u => u.email !== email);
//     localStorage.setItem('users', JSON.stringify(allUsers.map(ensureUserValues)));
//     setUsers(allUsers);
//     toast({ title: 'Utilisateur Supprimé', description: `Le compte ${email} a été supprimé.` });
//   };

//   const banUser = (email, isBanned) => {
//     let allUsers = JSON.parse(localStorage.getItem('users') || '[]').map(ensureUserValues);
//     const updatedUsers = allUsers.map(u => u.email === email ? { ...u, banned: isBanned } : u);
//     localStorage.setItem('users', JSON.stringify(updatedUsers.map(ensureUserValues)));
//     setUsers(updatedUsers);
//     toast({ title: `Utilisateur ${isBanned ? 'Banni' : 'Débanni'}`, description: `Le compte ${email} a été ${isBanned ? 'banni' : 'débanni'}.` });
//   };

//   const promoteUser = (email, isAdmin) => {
//     let allUsers = JSON.parse(localStorage.getItem('users') || '[]').map(ensureUserValues);
//     const updatedUsers = allUsers.map(u => u.email === email ? { ...u, role: isAdmin ? 'admin' : 'client' } : u);
//     localStorage.setItem('users', JSON.stringify(updatedUsers.map(ensureUserValues)));
//     setUsers(updatedUsers);
//     toast({ title: `Rôle Mis à Jour`, description: `Le compte ${email} est maintenant ${isAdmin ? 'administrateur' : 'client'}.` });
//   };

//   return { user, users, loading, login, logout, register, updateUser, deleteUser, banUser, promoteUser };
// };

// export default useAuth;

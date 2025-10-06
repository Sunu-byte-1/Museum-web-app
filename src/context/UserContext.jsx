import React, { createContext, useContext, useState, useEffect } from 'react';
import usersData from '../data/users.json';

 /**
  * Contexte utilisateur
  * 
  * Responsabilités:
  * - Stocker l'état d'authentification (utilisateur courant, chargement, erreurs).
  * - Fournir des actions: `login`, `register`, `logout`, `updateProfile`.
  * - Persister la session dans `localStorage` pour conserver la connexion.
  */
const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Vérifier si l'utilisateur est connecté au chargement
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  /**
   * Authentification d'un utilisateur existant.
   * - Simule un appel API (timeout)
   * - Valide l'email/mot de passe via `users.json`
   * - Stocke l'utilisateur (sans mot de passe) dans l'état et `localStorage`
   */
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simuler une requête API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = usersData.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        const userData = { ...foundUser };
        delete userData.password; // Ne pas stocker le mot de passe
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true, user: userData };
      } else {
        setError('Email ou mot de passe incorrect');
        return { success: false, error: 'Email ou mot de passe incorrect' };
      }
    } catch (err) {
      setError('Erreur de connexion');
      return { success: false, error: 'Erreur de connexion' };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Inscription d'un nouvel utilisateur.
   * - Simule un appel API.
   * - Vérifie l'unicité de l'email dans `users.json`.
   * - Crée et persiste l'utilisateur côté client (démo).
   */
  const register = async (userData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simuler une requête API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Vérifier si l'email existe déjà
      const existingUser = usersData.find(u => u.email === userData.email);
      if (existingUser) {
        setError('Cet email est déjà utilisé');
        return { success: false, error: 'Cet email est déjà utilisé' };
      }
      
      // Créer un nouvel utilisateur
      const newUser = {
        id: usersData.length + 1,
        ...userData,
        role: 'user'
      };
      
      // Dans une vraie app, on ferait un appel API ici
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return { success: true, user: newUser };
    } catch (err) {
      setError('Erreur lors de l\'inscription');
      return { success: false, error: 'Erreur lors de l\'inscription' };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Déconnexion: efface l'utilisateur et la persistance.
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  /**
   * Mise à jour des informations du profil en local.
   * - Simule un appel réseau puis fusionne les champs.
   */
  const updateProfile = async (updatedData) => {
    if (!user) return { success: false, error: 'Non connecté' };
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Simuler une requête API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedUser = { ...user, ...updatedData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return { success: true, user: updatedUser };
    } catch (err) {
      setError('Erreur lors de la mise à jour');
      return { success: false, error: 'Erreur lors de la mise à jour' };
    } finally {
      setIsLoading(false);
    }
  };

  // Valeurs exposées au reste de l'application
  const value = {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};


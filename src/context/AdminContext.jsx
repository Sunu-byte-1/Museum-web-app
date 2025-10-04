import React, { createContext, useContext, useState, useEffect } from 'react';
import artworksData from '../data/artworks.json';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [artworks, setArtworks] = useState(artworksData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statistics, setStatistics] = useState({
    totalArtworks: 0,
    totalVisitors: 0,
    totalRevenue: 0,
    popularArtworks: []
  });

  // Calculer les statistiques
  useEffect(() => {
    const stats = {
      totalArtworks: artworks.length,
      totalVisitors: Math.floor(Math.random() * 10000) + 5000, // Simulé
      totalRevenue: Math.floor(Math.random() * 100000) + 50000, // Simulé
      popularArtworks: artworks
        .sort((a, b) => Math.random() - 0.5)
        .slice(0, 3)
    };
    setStatistics(stats);
  }, [artworks]);

  const addArtwork = async (artworkData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simuler une requête API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newArtwork = {
        id: artworks.length + 1,
        ...artworkData,
        isAvailable: true,
        qrCode: `QR${String(artworks.length + 1).padStart(3, '0')}`
      };
      
      setArtworks(prev => [...prev, newArtwork]);
      return { success: true, artwork: newArtwork };
    } catch (err) {
      setError('Erreur lors de l\'ajout de l\'œuvre');
      return { success: false, error: 'Erreur lors de l\'ajout de l\'œuvre' };
    } finally {
      setIsLoading(false);
    }
  };

  const updateArtwork = async (id, updatedData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simuler une requête API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setArtworks(prev => 
        prev.map(artwork => 
          artwork.id === id ? { ...artwork, ...updatedData } : artwork
        )
      );
      
      return { success: true };
    } catch (err) {
      setError('Erreur lors de la mise à jour de l\'œuvre');
      return { success: false, error: 'Erreur lors de la mise à jour de l\'œuvre' };
    } finally {
      setIsLoading(false);
    }
  };

  const deleteArtwork = async (id) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simuler une requête API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setArtworks(prev => prev.filter(artwork => artwork.id !== id));
      return { success: true };
    } catch (err) {
      setError('Erreur lors de la suppression de l\'œuvre');
      return { success: false, error: 'Erreur lors de la suppression de l\'œuvre' };
    } finally {
      setIsLoading(false);
    }
  };

  const toggleArtworkAvailability = async (id) => {
    const artwork = artworks.find(a => a.id === id);
    if (!artwork) return { success: false, error: 'Œuvre non trouvée' };
    
    return await updateArtwork(id, { isAvailable: !artwork.isAvailable });
  };

  const getArtworkById = (id) => {
    return artworks.find(artwork => artwork.id === parseInt(id));
  };

  const searchArtworks = (query) => {
    if (!query) return artworks;
    
    return artworks.filter(artwork =>
      artwork.title.toLowerCase().includes(query.toLowerCase()) ||
      artwork.artist.toLowerCase().includes(query.toLowerCase()) ||
      artwork.category.toLowerCase().includes(query.toLowerCase())
    );
  };

  const value = {
    artworks,
    statistics,
    isLoading,
    error,
    addArtwork,
    updateArtwork,
    deleteArtwork,
    toggleArtworkAvailability,
    getArtworkById,
    searchArtworks
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

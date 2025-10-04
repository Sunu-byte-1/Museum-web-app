import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { ArrowLeft, Play, Pause, Volume2, VolumeX, RotateCcw, ZoomIn, ZoomOut, Maximize, Minimize } from 'lucide-react';

export default function VirtualVisit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getArtworkById } = useAdmin();
  const [artwork, setArtwork] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(300); // 5 minutes en secondes

  useEffect(() => {
    const artworkData = getArtworkById(id);
    if (artworkData) {
      setArtwork(artworkData);
    } else {
      navigate('/');
    }
  }, [id, getArtworkById, navigate]);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const resetView = () => {
    setZoom(1);
    setRotation(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    setCurrentTime(newTime);
  };

  if (!artwork) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement de la visite virtuelle...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-black ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Header */}
      {!isFullscreen && (
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Retour
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Visite virtuelle - {artwork.title}</h1>
              <div className="w-20"></div>
            </div>
          </div>
        </div>
      )}

      <div className={`${isFullscreen ? 'h-screen' : 'h-[calc(100vh-80px)]'} relative`}>
        {/* Image principale */}
        <div className="relative w-full h-full overflow-hidden">
          <img
            src={artwork.image}
            alt={artwork.title}
            className="w-full h-full object-cover transition-transform duration-300"
            style={{
              transform: `scale(${zoom}) rotate(${rotation}deg)`,
              transformOrigin: 'center center'
            }}
          />
          
          {/* Overlay de contrôles */}
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
            <button
              onClick={togglePlay}
              className="bg-white bg-opacity-90 text-black p-4 rounded-full hover:bg-opacity-100 transition"
            >
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
            </button>
          </div>
        </div>

        {/* Contrôles de navigation */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-black bg-opacity-70 rounded-lg p-4">
            {/* Barre de progression */}
            <div className="mb-4">
              <div
                className="w-full h-2 bg-gray-600 rounded-full cursor-pointer"
                onClick={handleSeek}
              >
                <div
                  className="h-2 bg-blue-500 rounded-full transition-all"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-white text-sm mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Contrôles */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={togglePlay}
                  className="text-white hover:text-blue-400 transition"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>
                
                <button
                  onClick={toggleMute}
                  className="text-white hover:text-blue-400 transition"
                >
                  {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleZoomOut}
                  className="text-white hover:text-blue-400 transition p-2"
                >
                  <ZoomOut className="w-5 h-5" />
                </button>
                
                <span className="text-white text-sm px-2">
                  {Math.round(zoom * 100)}%
                </span>
                
                <button
                  onClick={handleZoomIn}
                  className="text-white hover:text-blue-400 transition p-2"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
                
                <button
                  onClick={handleRotate}
                  className="text-white hover:text-blue-400 transition p-2"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
                
                <button
                  onClick={resetView}
                  className="text-white hover:text-blue-400 transition p-2"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={toggleFullscreen}
                className="text-white hover:text-blue-400 transition"
              >
                {isFullscreen ? <Minimize className="w-6 h-6" /> : <Maximize className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Informations de l'œuvre */}
        {!isFullscreen && (
          <div className="absolute top-4 right-4 max-w-sm">
            <div className="bg-white bg-opacity-90 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{artwork.title}</h3>
              <p className="text-gray-600 mb-1">par {artwork.artist}</p>
              <p className="text-sm text-gray-500">{artwork.year} • {artwork.category}</p>
            </div>
          </div>
        )}
      </div>

      {/* Panneau d'informations détaillées */}
      {!isFullscreen && (
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">À propos de cette œuvre</h2>
                <p className="text-gray-700 leading-relaxed mb-6">{artwork.description}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Artiste</h4>
                    <p className="text-gray-600">{artwork.artist}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Année</h4>
                    <p className="text-gray-600">{artwork.year}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Catégorie</h4>
                    <p className="text-gray-600">{artwork.category}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Localisation</h4>
                    <p className="text-gray-600">{artwork.room}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Contrôles de la visite</h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Navigation</h4>
                    <p className="text-blue-700 text-sm">
                      Utilisez les contrôles pour zoomer, faire pivoter et naviguer dans l'œuvre.
                    </p>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-semibold text-green-900 mb-2">Audio</h4>
                    <p className="text-green-700 text-sm">
                      Activez l'audio pour écouter les commentaires détaillés sur l'œuvre.
                    </p>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-900 mb-2">Plein écran</h4>
                    <p className="text-purple-700 text-sm">
                      Cliquez sur l'icône plein écran pour une expérience immersive.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

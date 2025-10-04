import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import eventsData from '../data/events.json';
import { 
  ArrowRight, 
  Camera, 
  Play, 
  Ticket, 
  Star, 
  Users, 
  Clock,
  MapPin,
  Phone,
  Mail,
  Eye,
  Building,
  Calendar,
  TrendingUp
} from 'lucide-react';

// Composant Hero Section
function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/assets/hero/6.mp4" type="video/mp4" />
      </video>
      
      {/* Overlay avec gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 dark:from-white/20 dark:via-white/10 dark:to-white/30"></div>
      
      {/* Pattern décoratif */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500 bg-opacity-20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-600 bg-opacity-20 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-orange-400 bg-opacity-20 rounded-full blur-lg"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4">
        <div className="mb-6">
          <span className="inline-block px-4 py-2 bg-orange-600 text-white text-sm font-semibold rounded-full mb-4">
            Musée des Civilisations Noires
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-serif leading-tight">
          Bienvenue au Musée des Civilisations Noires
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-orange-100 max-w-3xl mx-auto leading-relaxed">
          Explorez nos œuvres en ligne ou sur place et découvrez un patrimoine culturel exceptionnel
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/visite-virtuelle/1"
            className="bg-orange-600 text-white px-8 py-4 rounded-lg hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
          >
            <Play className="w-5 h-5 mr-2" />
            Visite virtuelle
          </Link>
          <Link
            to="/billet"
            className="bg-white text-gray-900 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
          >
            <Ticket className="w-5 h-5 mr-2" />
            Acheter un billet
          </Link>
        </div>
      </div>
    </section>
  );
}

// Composant Choix de l'expérience
function ExperienceSection() {
  const experiences = [
    {
      title: "Visite virtuelle",
      description: "Explorez nos collections depuis chez vous avec une expérience immersive",
      icon: Eye,
      link: "/visite-virtuelle/1",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      hoverColor: "hover:from-blue-600 hover:to-blue-700"
    },
    {
      title: "Visite sur place",
      description: "Découvrez nos œuvres en personne et vivez l'expérience muséale",
      icon: Building,
      link: "/billet",
      color: "bg-gradient-to-br from-green-500 to-green-600",
      hoverColor: "hover:from-green-600 hover:to-green-700"
    },
    {
      title: "Scanner une œuvre",
      description: "Obtenez des informations détaillées en scannant les QR codes",
      icon: Camera,
      link: "/scan",
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      hoverColor: "hover:from-purple-600 hover:to-purple-700"
    }
  ];

  return (
    <section className="py-20 bg-stone-50 dark:bg-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Choisissez votre expérience
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Trois façons de découvrir notre patrimoine culturel
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiences.map((exp, index) => {
            const Icon = exp.icon;
            return (
              <Link
                key={index}
                to={exp.link}
                className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 dark:border-gray-700"
              >
                <div className={`w-20 h-20 ${exp.color} ${exp.hoverColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center group-hover:text-orange-600 transition-colors duration-300">
                  {exp.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                  {exp.description}
                </p>
                <div className="mt-6 flex items-center justify-center text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Composant Historique
function HistorySection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('history-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { number: 500, label: "œuvres exposées", suffix: "+" },
    { number: 50, label: "artistes", suffix: "+" },
    { number: 100, label: "visiteurs par jour", suffix: "+" }
  ];

  return (
    <section id="history-section" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Pattern de fond */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent dark:from-orange-900/10 dark:to-transparent"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-serif">
            Notre Histoire
          </h2>
          <div className="w-24 h-1 bg-orange-600 mx-auto mb-8"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                Le Musée des Civilisations Noires est né d'une vision ambitieuse : créer un espace 
                dédié à la préservation et à la valorisation du patrimoine culturel africain et de 
                la diaspora noire à travers le monde.
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                Depuis son inauguration, notre musée s'est imposé comme une référence internationale 
                dans la mise en valeur des civilisations noires, offrant aux visiteurs une expérience 
                immersive et éducative unique.
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                Chaque exposition, chaque œuvre, chaque événement raconte une partie de cette 
                histoire riche et complexe, contribuant à une meilleure compréhension de notre 
                patrimoine commun.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6">
              <img
                src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=400&q=80"
                alt="Création du musée"
                className="rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
              <img
                src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=400&q=80"
                alt="Chantier"
                className="rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
            </div>
            <div className="space-y-6 mt-8">
              <img
                src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=400&q=80"
                alt="Pose première pierre"
                className="rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
              <img
                src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=400&q=80"
                alt="Inauguration"
                className="rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
            </div>
          </div>
        </div>

        {/* Statistiques animées */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                <div className={`text-4xl md:text-5xl lg:text-6xl font-bold text-orange-600 mb-3 transition-all duration-1000 group-hover:scale-110 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}
                     style={{ transitionDelay: `${index * 200}ms` }}>
                  {isVisible ? stat.number : 0}{stat.suffix}
                </div>
                <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Composant Événements
function EventsSection() {
  return (
    <section className="py-20 bg-stone-50 dark:bg-stone-800 relative overflow-hidden">
      {/* Pattern de fond */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-50/50 to-transparent dark:from-orange-900/10 dark:to-transparent"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-serif">
            Actualités & Événements
          </h2>
          <div className="w-24 h-1 bg-orange-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Découvrez nos prochains événements et expositions exceptionnelles
          </p>
        </div>
        
        <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
          {eventsData.map((event) => (
            <div key={event.id} className="flex-shrink-0 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.titre}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {event.type}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <Calendar className="w-4 h-4 text-orange-600 mr-2" />
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    {new Date(event.date).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {event.titre}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 leading-relaxed">
                  {event.description}
                </p>
                <div className="mt-4 flex items-center text-orange-600 text-sm font-medium">
                  <span>En savoir plus</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Composant CTA
function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-700 relative overflow-hidden">
      {/* Pattern décoratif */}
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-white bg-opacity-10 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white bg-opacity-10 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-white bg-opacity-10 rounded-full"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-serif">
          Prêt à découvrir nos trésors ?
        </h2>
        <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
          Plongez dans l'univers fascinant des civilisations noires et explorez un patrimoine culturel exceptionnel
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/visite-virtuelle/1"
            className="bg-white text-orange-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center font-semibold"
          >
            <Play className="w-5 h-5 mr-2" />
            Commencer la visite virtuelle
          </Link>
          <Link
            to="/billet"
            className="bg-gray-900 text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center font-semibold"
          >
            <Ticket className="w-5 h-5 mr-2" />
            Acheter un ticket
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Accueil() {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900">
      <HeroSection />
      <ExperienceSection />
      <HistorySection />
      <EventsSection />
      <CTASection />
    </div>
  );
}
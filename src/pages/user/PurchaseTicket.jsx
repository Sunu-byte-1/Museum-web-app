import React, { useMemo, useState } from 'react';
import { useTicket } from '../../context/TicketContext';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, Trash2, CreditCard, Check, Clock } from 'lucide-react';

export default function PurchaseTicket() {
  const { cart, addCustomToCart, removeFromCart, updateCartQuantity, getCartTotal, getCartItemCount, purchaseTickets, isLoading } = useTicket();
  const { user } = useUser();
  const navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [selection, setSelection] = useState({
    libre: { plein: 0, scolaireEtudiant: 0, groupe: 0 },
    guidee: { plein: 0, scolaire: 0, etudiant: 0, groupe: 0 },
  });

  const librePrices = useMemo(() => ({ plein: 3000, scolaireEtudiant: 500, groupe: 2500 }), []);
  const guideePrices = useMemo(() => ({ plein: 5000, scolaire: 1000, etudiant: 1500, groupe: 4000 }), []);

  // plus d'ajout direct par type, remplacé par les sélecteurs

  const handleRemoveFromCart = (ticketId) => {
    removeFromCart(ticketId);
  };

  const handleUpdateQuantity = (ticketId, quantity) => {
    updateCartQuantity(ticketId, quantity);
  };

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setShowCheckout(true);
  };

  const handlePurchase = async (e) => {
    e.preventDefault();
    const result = await purchaseTickets(customerInfo);
    if (result.success) {
      setPurchaseSuccess(true);
      setShowCheckout(false);
    }
  };

  if (purchaseSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Achat réussi !</h2>
          <p className="text-gray-600 mb-6">Vos billets ont été achetés avec succès. Vous recevrez un email de confirmation.</p>
          <button
            onClick={() => setPurchaseSuccess(false)}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Acheter d'autres billets
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-milk relative overflow-hidden">
      {/* Décor de fond */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-orange-500/10 blur-3xl"></div>
        <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Hero */}
        <div className="mb-10 animate-fade-in">
          <div className="rounded-3xl bg-gradient-to-r from-orange-600 to-orange-700 p-[1px] shadow-strong">
            <div className="rounded-3xl bg-white/90 dark:bg-gray-900/80 backdrop-blur px-6 py-6 md:px-10 md:py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Acheter des billets</h1>
                <p className="text-gray-700 dark:text-gray-300 mt-1">Choisissez vos formules et quantité, puis payez en toute simplicité</p>
              </div>
              <div className="inline-flex items-center gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2">
                <Clock className="w-5 h-5 text-orange-600" />
                <div className="text-left">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">Horaires d'ouverture</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Mardi à Dimanche — 10h00 à 19h00</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Fermé le Lundi</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-slide-up">
          {/* Liste des billets */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tarifs (placés ici pour éviter la répétition et meilleure UX) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Visite libre</h2>
                <ul className="space-y-2 text-gray-700">
                  <li><span className="font-semibold">Tarif plein</span>: 3000 FCFA</li>
                  <li><span className="font-semibold">Scolaire et étudiant</span>: 500 FCFA</li>
                  <li><span className="font-semibold">Groupe (10 à 30)</span>: 2500 FCFA / personne</li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Visite guidée</h2>
                <ul className="space-y-2 text-gray-700">
                  <li><span className="font-semibold">Tarif plein</span>: 5000 FCFA</li>
                  <li><span className="font-semibold">Scolaire</span>: 1000 FCFA</li>
                  <li><span className="font-semibold">Étudiant</span>: 1500 FCFA</li>
                  <li><span className="font-semibold">Groupe (10 à 30)</span>: 4000 FCFA / personne</li>
                </ul>
              </div>
            </div>

            {/* Sélecteurs des formules */}
            <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Visite libre</h3>
                <div className="flex gap-2 text-xs">
                  <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">FCFA</span>
                </div>
              </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition bg-white shadow-soft">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium text-gray-800">Tarif plein</div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">{librePrices.plein} FCFA</span>
                  </div>
                  <select value={selection.libre.plein} onChange={(e) => setSelection(s => ({ ...s, libre: { ...s.libre, plein: parseInt(e.target.value || '0', 10) } }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    {Array.from({ length: 31 }).map((_, i) => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div className="p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition bg-white shadow-soft">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium text-gray-800">Scolaire & étudiant</div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">{librePrices.scolaireEtudiant} FCFA</span>
                  </div>
                  <select value={selection.libre.scolaireEtudiant} onChange={(e) => setSelection(s => ({ ...s, libre: { ...s.libre, scolaireEtudiant: parseInt(e.target.value || '0', 10) } }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    {Array.from({ length: 31 }).map((_, i) => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div className="p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition bg-white shadow-soft">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium text-gray-800">Groupe (10 à 30)</div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">{librePrices.groupe} FCFA</span>
                  </div>
                  <select value={selection.libre.groupe} onChange={(e) => setSelection(s => ({ ...s, libre: { ...s.libre, groupe: parseInt(e.target.value || '0', 10) } }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    {Array.from({ length: 31 }).map((_, i) => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
              </div>
              <div className="mt-5 flex justify-end">
                <button onClick={() => {
                  if (selection.libre.plein > 0) addCustomToCart({ type: 'Visite libre - Tarif plein (FCFA)', price: librePrices.plein, description: 'Entrée libre - plein' }, selection.libre.plein);
                  if (selection.libre.scolaireEtudiant > 0) addCustomToCart({ type: 'Visite libre - Scolaire/Étudiant (FCFA)', price: librePrices.scolaireEtudiant, description: 'Entrée libre - scolaire/étudiant' }, selection.libre.scolaireEtudiant);
                  if (selection.libre.groupe > 0) addCustomToCart({ type: 'Visite libre - Groupe (FCFA)', price: librePrices.groupe, description: 'Entrée libre - groupe (10 à 30)' }, selection.libre.groupe);
                }} className="px-5 py-2.5 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition transform hover:scale-[1.02]">Ajouter au panier</button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Visite guidée</h3>
                <div className="flex gap-2 text-xs">
                  <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">FCFA</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition bg-white shadow-soft">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium text-gray-800">Tarif plein</div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">{guideePrices.plein} FCFA</span>
                  </div>
                  <select value={selection.guidee.plein} onChange={(e) => setSelection(s => ({ ...s, guidee: { ...s.guidee, plein: parseInt(e.target.value || '0', 10) } }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    {Array.from({ length: 31 }).map((_, i) => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div className="p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition bg-white shadow-soft">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium text-gray-800">Scolaire</div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">{guideePrices.scolaire} FCFA</span>
                  </div>
                  <select value={selection.guidee.scolaire} onChange={(e) => setSelection(s => ({ ...s, guidee: { ...s.guidee, scolaire: parseInt(e.target.value || '0', 10) } }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    {Array.from({ length: 31 }).map((_, i) => <option key={i} value={i}>{i}</option>)}
                  </select>
                    </div>
                <div className="p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition bg-white shadow-soft">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium text-gray-800">Étudiant</div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">{guideePrices.etudiant} FCFA</span>
                  </div>
                  <select value={selection.guidee.etudiant} onChange={(e) => setSelection(s => ({ ...s, guidee: { ...s.guidee, etudiant: parseInt(e.target.value || '0', 10) } }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    {Array.from({ length: 31 }).map((_, i) => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div className="p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition bg-white shadow-soft">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium text-gray-800">Groupe (10 à 30)</div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">{guideePrices.groupe} FCFA</span>
                  </div>
                  <select value={selection.guidee.groupe} onChange={(e) => setSelection(s => ({ ...s, guidee: { ...s.guidee, groupe: parseInt(e.target.value || '0', 10) } }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    {Array.from({ length: 31 }).map((_, i) => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
              </div>
              <div className="mt-5 flex justify-end">
                <button onClick={() => {
                  if (selection.guidee.plein > 0) addCustomToCart({ type: 'Visite guidée - Tarif plein (FCFA)', price: guideePrices.plein, description: 'Visite guidée - plein' }, selection.guidee.plein);
                  if (selection.guidee.scolaire > 0) addCustomToCart({ type: 'Visite guidée - Scolaire (FCFA)', price: guideePrices.scolaire, description: 'Visite guidée - scolaire' }, selection.guidee.scolaire);
                  if (selection.guidee.etudiant > 0) addCustomToCart({ type: 'Visite guidée - Étudiant (FCFA)', price: guideePrices.etudiant, description: 'Visite guidée - étudiant' }, selection.guidee.etudiant);
                  if (selection.guidee.groupe > 0) addCustomToCart({ type: 'Visite guidée - Groupe (FCFA)', price: guideePrices.groupe, description: 'Visite guidée - groupe (10 à 30)' }, selection.guidee.groupe);
                }} className="px-5 py-2.5 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition transform hover:scale-[1.02]">Ajouter au panier</button>
              </div>
            </div>
          </div>

          {/* Panier */}
          <div className="lg:col-span-1">
            <div className="bg-white/95 dark:bg-gray-900/90 backdrop-blur rounded-2xl shadow-strong p-6 sticky top-8 border border-gray-100 dark:border-gray-800">
              <div className="flex items-center mb-4">
                <ShoppingCart className="w-5 h-5 mr-2" />
                <h3 className="text-lg font-semibold">Panier ({getCartItemCount()})</h3>
              </div>

              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Votre panier est vide</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.ticketId} className="flex items-center justify-between py-2 border-b border-gray-200">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.ticket.type}</p>
                        <p className="text-gray-600 text-sm">{item.ticket.price}€</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleUpdateQuantity(item.ticketId, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.ticketId, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleRemoveFromCart(item.ticketId)}
                          className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center hover:bg-red-200 text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>Total:</span>
                      <span>{getCartTotal()}€</span>
                    </div>
                  </div>

                  {/* Modes de paiement */}
                  <div className="mt-3 text-sm text-gray-600">
                    <div className="font-semibold mb-2">Moyens de paiement</div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 rounded-md bg-indigo-100 text-indigo-800">Wave</span>
                      <span className="px-2 py-1 rounded-md bg-orange-100 text-orange-800">Orange Money</span>
                      <span className="px-2 py-1 rounded-md bg-green-100 text-green-800">Carte bancaire</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition flex items-center justify-center"
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    Procéder au paiement
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal de checkout */}
        {showCheckout && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md mx-4 w-full">
              <h2 className="text-2xl font-bold mb-6">Informations de facturation</h2>
              
              <form onSubmit={handlePurchase} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prénom
                  </label>
                  <input
                    type="text"
                    value={customerInfo.firstName}
                    onChange={(e) => setCustomerInfo({...customerInfo, firstName: e.target.value})}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom
                  </label>
                  <input
                    type="text"
                    value={customerInfo.lastName}
                    onChange={(e) => setCustomerInfo({...customerInfo, lastName: e.target.value})}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total à payer:</span>
                    <span>{getCartTotal()}€</span>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowCheckout(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    {isLoading ? 'Traitement...' : 'Confirmer l\'achat'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useMemo, useState } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, CreditCard, Check, Tag, Package } from 'lucide-react';

const SAMPLE_PRODUCTS = [
  { id: 1, name: 'T-shirt MCN', description: 'Coton bio, logo Musée des Civilisations Noires', price: 20, image: 'https://images.unsplash.com/photo-1520975682031-ae4c9b5e2f5b?q=80&w=600&auto=format&fit=crop', stock: 25, category: 'Textile' },
  { id: 2, name: 'Mug MCN', description: 'Céramique blanche, impression durable', price: 12, image: 'https://images.unsplash.com/photo-1490111718993-d98654ce6cf7?q=80&w=600&auto=format&fit=crop', stock: 40, category: 'Accessoires' },
  { id: 3, name: 'Poster Œuvre', description: 'Affiche A2 d’une œuvre emblématique', price: 15, image: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?q=80&w=600&auto=format&fit=crop', stock: 15, category: 'Papeterie' },
  { id: 4, name: 'Totebag MCN', description: 'Sac en toile robuste, motif MCN', price: 18, image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=600&auto=format&fit=crop', stock: 30, category: 'Textile' },
];

export default function Boutique() {
  const [cart, setCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderDone, setOrderDone] = useState(false);
  const [filter, setFilter] = useState('Tout');

  const categories = useMemo(() => ['Tout', ...Array.from(new Set(SAMPLE_PRODUCTS.map(p => p.category)))], []);
  const visibleProducts = useMemo(() => filter === 'Tout' ? SAMPLE_PRODUCTS : SAMPLE_PRODUCTS.filter(p => p.category === filter), [filter]);

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i => i.product.id === product.id ? { ...i, quantity: Math.min(i.quantity + quantity, product.stock) } : i);
      }
      return [...prev, { product, quantity: Math.min(quantity, product.stock) }];
    });
  };

  const updateQty = (productId, quantity) => {
    if (quantity <= 0) {
      return removeFromCart(productId);
    }
    setCart(prev => prev.map(i => i.product.id === productId ? { ...i, quantity } : i));
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(i => i.product.id !== productId));
  };

  const cartCount = useMemo(() => cart.reduce((acc, i) => acc + i.quantity, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((acc, i) => acc + i.product.price * i.quantity, 0), [cart]);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setShowCheckout(true);
  };

  const confirmOrder = async () => {
    await new Promise(r => setTimeout(r, 1200));
    setOrderDone(true);
    setShowCheckout(false);
    setCart([]);
  };

  if (orderDone) {
    return (
      <div className="min-h-screen bg-[#f5f4ef] flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4 text-center">
          <div className="w-16 h-16 bg-green-100  rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Commande confirmée</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Merci pour votre achat. Vous recevrez un email de confirmation.</p>
          <button onClick={() => setOrderDone(false)} className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">Continuer vos achats</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-milk">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 ">Boutique</h1>
            <p className="text-gray-600 ">Objets et souvenirs officiels du musée</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-200 border border-white rounded-lg px-3 py-2">
              <Tag className="w-4 h-4 text-gray-500" />
              <select value={filter} onChange={(e) => setFilter(e.target.value)} className="bg-transparent text-sm text-gray-700 rounded-3  focus:outline-none">
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2 bg-gray-200 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2">
              <ShoppingCart className="w-4 h-4" />
              <span className="text-sm">{cartCount} article{cartCount > 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProducts.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl shadow-soft overflow-hidden border border-gray-100 transition-transform hover:-translate-y-1">
              <div className="relative">
                <img src={p.image} alt={p.name} loading="lazy" decoding="async" sizes="(max-width: 1024px) 100vw, 33vw" className="w-full h-48 object-cover" />
                <div className="absolute top-3 left-3 bg-orange-600 text-white text-xs px-2 py-1 rounded-full">{p.category}</div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{p.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{p.description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold text-orange-600">{p.price} Fcfa</div>
                  <div className="text-sm text-gray-500">Stock: {p.stock}</div>
                </div>
                <button onClick={() => addToCart(p, 1)} className="mt-4 w-full bg-gray-900 text-white cursor-pointer rounded-lg py-2 hover:opacity-90 transition flex items-center justify-center">
                  <Package className="w-4 h-4 mr-2" />
                  Ajouter au panier
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {cart.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 text-center text-gray-500 dark:text-gray-400">
                Votre panier est vide
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map(({ product, quantity }) => (
                  <div key={product.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.price}€</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQty(product.id, quantity - 1)} className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600"><Minus className="w-4 h-4" /></button>
                      <span className="w-8 text-center">{quantity}</span>
                      <button onClick={() => updateQty(product.id, Math.min(quantity + 1, product.stock))} className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600"><Plus className="w-4 h-4" /></button>
                      <button onClick={() => removeFromCart(product.id)} className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center hover:bg-red-200 dark:hover:bg-red-800 text-red-600"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white/95 dark:bg-gray-900/90 backdrop-blur rounded-2xl shadow-strong p-6 sticky top-8 border border-gray-100 dark:border-gray-800">
              <div className="flex items-center mb-4">
                <ShoppingCart className="w-5 h-5 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Panier ({cartCount})</h3>
              </div>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex justify-between"><span>Sous-total</span><span>{cartTotal}€</span></div>
                <div className="flex justify-between"><span>Livraison</span><span>Calculée à l’étape suivante</span></div>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>
              <div className="flex justify-between items-center text-lg font-semibold text-gray-900 dark:text-white">
                <span>Total</span>
                <span>{cartTotal}€</span>
              </div>
              <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                <div className="font-semibold mb-2">Moyens de paiement</div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 rounded-md bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200">Wave</span>
                  <span className="px-2 py-1 rounded-md bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200">Orange Money</span>
                  <span className="px-2 py-1 rounded-md bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">Carte bancaire</span>
                </div>
              </div>
              <button onClick={handleCheckout} disabled={cart.length === 0} className="mt-4 w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Procéder au paiement
              </button>
            </div>
          </div>
        </div>
      </div>

      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md mx-4 w-full">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Paiement</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Paiement simulé pour la démonstration.</p>
            <button onClick={confirmOrder} className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition">Confirmer la commande</button>
            <button onClick={() => setShowCheckout(false)} className="w-full mt-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition">Annuler</button>
          </div>
        </div>
      )}
    </div>
  );
}



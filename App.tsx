// Fix: Create full content for App.tsx
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProfilePage } from './components/ProfilePage';
import { ListingCard } from './components/ListingCard';
import { PostAdModal } from './components/PostAdModal';
import { PaymentModal } from './components/PaymentModal';
import { View, Listing, User, Review } from './types';

// Mock Data
const MOCK_USER: User = {
  id: 1,
  name: 'Alex Dupont',
  avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  rating: 4.8,
  reviewsCount: 32,
  bio: 'Amateur de bonnes affaires et passionné par le bricolage. Toujours prêt à dénicher la perle rare !',
};

const MOCK_LISTINGS: Listing[] = [
  { id: 1, title: 'Vélo de ville vintage', price: 75000, description: 'Superbe vélo de ville des années 80, entièrement restauré. Parfait pour les balades en ville.', imageUrl: 'https://images.unsplash.com/photo-1559348349-36dfc68b26de?w=400', category: 'loisirs', sellerId: 1, location: 'Ouagadougou' },
  { id: 2, title: 'Canapé scandinave 3 places', price: 275000, description: 'Canapé en tissu gris, style scandinave. Très confortable, en excellent état.', imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400', category: 'maison', sellerId: 2, location: 'Dakar' },
  { id: 3, title: 'Blouson en cuir véritable', price: 50000, description: 'Veste en cuir noir, taille M. Style motard, peu portée.', imageUrl: 'https://images.unsplash.com/photo-1591047139829-d916e6ca4431?w=400', category: 'mode', sellerId: 1, location: 'Abidjan' },
  { id: 4, title: 'Offre: Développeur React Freelance', price: 300000, description: 'Recherche développeur React pour une mission de 3 mois. Expérience requise.', imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400', category: 'emploi', sellerId: 3, location: 'Télétravail' },
  { id: 5, title: 'Guitare acoustique Folk', price: 95000, description: 'Guitare de marque "Seagull", idéale pour débutants et confirmés. Vendue avec sa housse.', imageUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106945?w=400', category: 'loisirs', sellerId: 1, location: 'Bamako' },
  { id: 6, title: 'Peugeot 208 - Très bon état', price: 5500000, description: 'Voiture citadine, faible kilométrage. Contrôle technique OK.', imageUrl: 'https://images.unsplash.com/photo-1616422285421-9BC2b4444555?w=400', category: 'vehicule', sellerId: 4, location: 'Cotonou' },
];

const MOCK_REVIEWS: Review[] = [
  { id: 1, rating: 5, text: 'Vendeur très sympa et produit conforme à la description. Je recommande !', reviewerName: 'Marie', reviewerAvatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704e' },
  { id: 2, rating: 4, text: 'Transaction rapide, mais l\'emballage était un peu léger.', reviewerName: 'Julien', reviewerAvatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704f' },
];


const HomePage: React.FC<{ listings: Listing[], onSelectListing: (id: number) => void }> = ({ listings, onSelectListing }) => (
  <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {listings.map(listing => (
      <ListingCard key={listing.id} listing={listing} onClick={() => onSelectListing(listing.id)} />
    ))}
  </div>
);

const ListingDetailPage: React.FC<{ listing: Listing, onBack: () => void, onPay: () => void }> = ({ listing, onBack, onPay }) => (
    <div className="p-4">
        <button onClick={onBack} className="mb-4 text-teal-600">&larr; Retour</button>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={listing.imageUrl} alt={listing.title} className="w-full h-64 object-cover" />
            <div className="p-4">
                <h1 className="text-2xl font-bold">{listing.title}</h1>
                <p className="text-2xl font-bold text-teal-600 my-2">{listing.price.toLocaleString('fr-BF')} XOF</p>
                <p className="text-gray-600">{listing.description}</p>
                <button onClick={onPay} className="mt-4 w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700">
                    Payer
                </button>
            </div>
        </div>
    </div>
);


const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedListingId, setSelectedListingId] = useState<number | null>(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handleSetView = (view: View) => {
    if (view === 'post') {
      setIsPostModalOpen(true);
    } else {
      setCurrentView(view);
      setSelectedListingId(null); // Reset listing selection when changing main views
    }
  };

  const handleSelectListing = (id: number) => {
      setSelectedListingId(id);
      setCurrentView('listingDetail');
  };

  const selectedListing = MOCK_LISTINGS.find(l => l.id === selectedListingId);

  const renderContent = () => {
    if (selectedListing && currentView === 'listingDetail') {
        return <ListingDetailPage 
            listing={selectedListing} 
            onBack={() => {
                setCurrentView('home');
                setSelectedListingId(null);
            }} 
            onPay={() => setIsPaymentModalOpen(true)}
        />;
    }

    switch (currentView) {
      case 'profile':
        return <ProfilePage 
          user={MOCK_USER} 
          reviews={MOCK_REVIEWS} 
          userListings={MOCK_LISTINGS.filter(l => l.sellerId === MOCK_USER.id)}
          onSelectListing={handleSelectListing}
        />;
      case 'home':
      default:
        return <HomePage listings={MOCK_LISTINGS} onSelectListing={handleSelectListing} />;
    }
  };

  return (
    <div className="font-sans bg-gray-50 min-h-screen pb-24">
      <Header />
      <main className="max-w-4xl mx-auto">
        {renderContent()}
      </main>
      <Footer currentView={currentView} setView={handleSetView} />
      <PostAdModal isOpen={isPostModalOpen} onClose={() => setIsPostModalOpen(false)} />
      {selectedListing && <PaymentModal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} listingTitle={selectedListing.title} />}
    </div>
  );
};

export default App;
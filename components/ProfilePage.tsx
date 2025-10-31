import React, { useState, useCallback } from 'react';
import { User, Review, Listing } from '../types';
import { generateBio } from '../services/geminiService';
import { ListingCard } from './ListingCard';
import { StarIcon } from './Icons';
import { Spinner } from './Spinner';

interface ProfilePageProps {
  user: User;
  reviews: Review[];
  userListings: Listing[];
  onSelectListing: (id: number) => void;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
            <StarIcon key={i} filled={i < rating} />
        ))}
    </div>
);

export const ProfilePage: React.FC<ProfilePageProps> = ({ user, reviews, userListings, onSelectListing }) => {
    const [activeTab, setActiveTab] = useState<'listings' | 'reviews'>('listings');
    const [bioKeywords, setBioKeywords] = useState('');
    const [currentBio, setCurrentBio] = useState(user.bio);
    const [isGeneratingBio, setIsGeneratingBio] = useState(false);

    const handleGenerateBio = useCallback(async () => {
        if (!bioKeywords) {
            alert('Veuillez entrer quelques mots-clés.');
            return;
        }
        setIsGeneratingBio(true);
        const newBio = await generateBio(bioKeywords);
        setCurrentBio(newBio);
        setIsGeneratingBio(false);
    }, [bioKeywords]);

  return (
    <div className="p-4">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left">
          <img src={user.avatarUrl} alt={user.name} className="w-24 h-24 rounded-full mb-4 sm:mb-0 sm:mr-6" />
          <div className="flex-grow">
            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
            <div className="flex items-center justify-center sm:justify-start my-2 text-yellow-500">
              <StarRating rating={Math.round(user.rating)} />
              <span className="text-gray-600 ml-2">{user.rating.toFixed(1)} ({user.reviewsCount} avis)</span>
            </div>
            <p className="text-gray-600">{currentBio}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t">
            <p className="text-sm font-medium text-gray-700 mb-2">Générer une nouvelle bio avec l'IA</p>
            <div className="flex flex-col sm:flex-row gap-2">
                <input 
                    type="text"
                    value={bioKeywords}
                    onChange={(e) => setBioKeywords(e.target.value)}
                    placeholder="Ex: passionné de vintage, aime aider"
                    className="flex-grow border border-gray-300 rounded-md shadow-sm py-2 px-3"
                />
                <button 
                    onClick={handleGenerateBio} 
                    disabled={isGeneratingBio}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300 flex items-center justify-center"
                >
                    {isGeneratingBio ? <Spinner size="sm"/> : 'Générer'}
                </button>
            </div>
        </div>
      </div>
      
      <div className="mb-4 border-b border-gray-200">
          <nav className="flex space-x-4" aria-label="Tabs">
              <button onClick={() => setActiveTab('listings')} className={`px-3 py-2 font-medium text-sm rounded-t-lg ${activeTab === 'listings' ? 'border-b-2 border-teal-500 text-teal-600' : 'text-gray-500 hover:text-gray-700'}`}>Mes Annonces ({userListings.length})</button>
              <button onClick={() => setActiveTab('reviews')} className={`px-3 py-2 font-medium text-sm rounded-t-lg ${activeTab === 'reviews' ? 'border-b-2 border-teal-500 text-teal-600' : 'text-gray-500 hover:text-gray-700'}`}>Avis ({reviews.length})</button>
          </nav>
      </div>

      {activeTab === 'listings' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {userListings.map(listing => (
                  <ListingCard key={listing.id} listing={listing} onClick={() => onSelectListing(listing.id)} />
              ))}
          </div>
      )}

      {activeTab === 'reviews' && (
          <div className="space-y-4">
              {reviews.map(review => (
                  <div key={review.id} className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center mb-2">
                          <StarRating rating={review.rating} />
                      </div>
                      <p className="text-gray-700">{review.text}</p>
                  </div>
              ))}
          </div>
      )}

    </div>
  );
};

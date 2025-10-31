// Fix: Create full content for components/ListingCard.tsx
import React from 'react';
import { Listing } from '../types';
import { CATEGORY_DETAILS } from '../constants';

interface ListingCardProps {
  listing: Listing;
  onClick: () => void;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing, onClick }) => {
  const categoryDetail = CATEGORY_DETAILS[listing.category];

  return (
    <div onClick={onClick} className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform transform hover:-translate-y-1">
      <div className="relative">
        <img src={listing.imageUrl} alt={listing.title} className="w-full h-32 object-cover" />
        <span className={`absolute top-2 left-2 text-white text-xs font-bold px-2 py-1 rounded ${categoryDetail.color}`}>
          {categoryDetail.name}
        </span>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-800 truncate">{listing.title}</h3>
        <p className="text-lg font-bold text-teal-600 mt-1">{listing.price.toLocaleString('fr-BF')} XOF</p>
        <p className="text-xs text-gray-500 mt-1">{listing.location}</p>
      </div>
    </div>
  );
};
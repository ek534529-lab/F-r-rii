// Fix: Create full content for components/PaymentModal.tsx
import React from 'react';
import { TruckIcon } from './Icons';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  listingTitle: string;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, listingTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <TruckIcon />
        </div>
        <h3 className="text-lg leading-6 font-medium text-gray-900 mt-4">Paiement sécurisé</h3>
        <div className="mt-2 px-7 py-3">
          <p className="text-sm text-gray-500">
            Procédez au paiement pour l'article : <span className="font-bold">{listingTitle}</span>.
          </p>
        </div>
        <div className="mt-4">
          <p className="text-xs text-gray-400">Cette fonctionnalité est en cours de développement.</p>
        </div>
        <div className="items-center px-4 py-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-teal-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

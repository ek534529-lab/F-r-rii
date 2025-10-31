import React from 'react';
import { HomeIcon, MapIcon, PlusCircleIcon, MessageIcon, UserIcon } from './Icons';
import { View } from '../types';

interface FooterProps {
  currentView: View;
  setView: (view: View) => void;
}

const NavItem: React.FC<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-full transition-colors duration-200 ${
      isActive ? 'text-teal-600' : 'text-gray-500 hover:text-teal-500'
    }`}
  >
    {icon}
    <span className="text-xs mt-1">{label}</span>
  </button>
);

export const Footer: React.FC<FooterProps> = ({ currentView, setView }) => {
  const mainViews: View[] = ['home', 'map', 'messages', 'profile'];
  
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_5px_rgba(0,0,0,0.1)] z-10">
      <div className="max-w-4xl mx-auto h-20 flex justify-around items-center px-4">
        <NavItem label="Accueil" icon={<HomeIcon />} isActive={currentView === 'home'} onClick={() => setView('home')} />
        <NavItem label="Carte" icon={<MapIcon />} isActive={currentView === 'map'} onClick={() => setView('map')} />
        
        <div className="relative">
          <button
            onClick={() => setView('post')}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-16 bg-teal-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-teal-700 transition-transform transform hover:scale-105"
          >
            <PlusCircleIcon />
          </button>
        </div>

        <NavItem label="Messages" icon={<MessageIcon />} isActive={currentView === 'messages'} onClick={() => setView('messages')} />
        <NavItem label="Profil" icon={<UserIcon />} isActive={currentView === 'profile'} onClick={() => setView('profile')} />
      </div>
    </footer>
  );
};

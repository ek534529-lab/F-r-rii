// Fix: Create full content for constants.tsx
import { Category } from './types';

export const CATEGORY_DETAILS: Record<Category, { name: string; color: string }> = {
  maison: { name: 'Maison', color: 'bg-blue-500' },
  vehicule: { name: 'Véhicule', color: 'bg-red-500' },
  emploi: { name: 'Emploi', color: 'bg-green-500' },
  loisirs: { name: 'Loisirs', color: 'bg-yellow-500' },
  mode: { name: 'Mode', color: 'bg-pink-500' },
};

// Fix: Create full content for types.ts, defining all necessary types for the application.
export type Category = 'maison' | 'vehicule' | 'emploi' | 'loisirs' | 'mode';

export type View = 'home' | 'map' | 'messages' | 'profile' | 'post' | 'listingDetail' | 'payment';

export interface User {
  id: number;
  name: string;
  avatarUrl: string;
  rating: number;
  reviewsCount: number;
  bio: string;
}

export interface Listing {
  id: number;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  category: Category;
  sellerId: number;
  location: string;
}

export interface Review {
  id: number;
  rating: number;
  text: string;
  reviewerName: string;
  reviewerAvatarUrl: string;
}

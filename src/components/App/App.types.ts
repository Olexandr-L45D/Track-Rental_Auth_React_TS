export type Props = {
  children: React.ReactNode; // Типизация для children
};

export type TruckDetailById = {
  id: number;
  name: string;
  location: string;
  rating: number;
  price: number;
  gallery: { original: string; thumb: string }[];
  description: string;
  reviews?: {
    reviewer_name: string;
    reviewer_rating: number;
    comment: string;
  }[];
};

export interface TruckAll{
  id: number;
  name: string;
  location: string;
  rating: number;
  price: number;
  gallery: { original: string; thumb: string }[];
  description: string;
  reviews: {
    reviewer_name: string;
    reviewer_rating: number;
    comment: string;
  }[];
};
// Тип TruckDetailById на базі Truck розширений властивостями для детальної інформації про вантажівку
export interface TruckDetailAll extends TruckAll {
  kitchen: boolean;
  AC: boolean;
  transmission: string; 
  engine: string;
  form: string;
  length: number;
  width: number;
  height: number;
  tank: number;
  consumption: string | number;
};

export interface BookinFormVelues {
    name: string;
    email: string;
    bookingDate: string;
    comment: string;
};

interface TruckDetailsProps {
  id: number; // Приймаємо тільки id як пропс
};

export type PropsisActive = {
  isActive: boolean;
  language: string;
};

type Props2 = {
  name: string;
  age: number;
  children: React.ReactNode; // Типизация для children
};

interface TruckPageProps {
  id: number; 
  page: number;
  totalpages: number;
  loading: boolean;
}

// export type TruckDetailById = {
//   id: number;
//   name: string;
//   location: string;
//   rating: number;
//   price: number;
//   gallery: { original: string, thumb: string }[];
//   description: string;
// };

// export function User({ name, age, children }: Props2) {
//   return (
//     <div>
//       <p>{`User name is ${name}`}</p>
//       <p>{`User age is ${age}`}</p>
//       {children} {/* Рендерим children */}
//     </div>
//   );
// }

// import React from 'react';

type User = {
  name: string;
  email: string;
};

type Props3 = {
  user: User;
  onUserUpdate: (user: User) => void;
};

// export function UserProfile({ user, onUserUpdate }: Props3) {
//   // компонент UserProfile
//   return null;
// }
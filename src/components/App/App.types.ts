// налаштування конфігурації для білд:
// прибираю  noEmit: true, що забороняє компілятору TypeScript створювати файли під час компіляції.
// Це окей для розробки, але може викликати проблеми під час білду.
//  створив додатковий файл .vscode/settings.json в корені проекту який допоміг прибрати багі в файлах конфігурації

export type Props = {
  children: React.ReactNode; // Типизация для children
};

export interface Truck{
  id: number;
  name: string;
  location: string;
};
// Тип TruckDetailById на базі Truck розширений властивостями для детальної інформації про вантажівку
export interface TruckDetailWithId extends Truck {
  rating: number;
  price: number;
  gallery: { original: string; thumb: string }[];
  description: string;
  reviews?: {
    reviewer_name: string;
    reviewer_rating: number;
    comment: string;
  }[];
}
export interface State{
  items: Truck[] | TruckDetailWithId[]; // Це має бути або список вантажівок, або деталі
  total: number;
  loading: boolean;
  isFetched: boolean;
  error: string | null;
  selectedTruck: TruckDetailWithId | null; // Для збереження деталей вантажівки
  isBooked: boolean;
  totalpages: number;
  page: number;
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

export interface TruckReview {
  reviews: { reviewer_name: string, reviewer_rating: number, comment: string }[];
  description: string;
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
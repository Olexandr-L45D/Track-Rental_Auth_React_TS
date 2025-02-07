type Props1 = {
  name: string;
  age: number;
};

type Props2 = {
  name: string;
  age: number;
  children: React.ReactNode; // Типизация для children
};

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
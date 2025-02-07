import React, { createContext, useContext, useEffect, useState } from 'react';
// логіка авторизації з тайскрипт
type User = {
  name: string;
  email: string;
};

type UserContextProps = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const UserContext = createContext<UserContextProps | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

// Сам провайдер
export function UserProviderAuth({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Хук для використання контексту
export function useUserState() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

// можливо потім перенести в окремий компонент але поки що щоб було видно
// Компонент, що використовує контекст
function UserProfile() {
  const { user, setUser } = useUserState();

  // Моделюємо завантаження даних про користувача.
  useEffect(() => {
    setTimeout(() => {
      setUser({
        name: 'John Doe',
        email: 'john.doe@example.com',
      });
    }, 2000);
  }, [setUser]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}



// type State = {
// count: number;
// };

// type Action = { type: 'increment' } | { type: 'decrement' };
// function reducer(state: State, action: Action): State {
//   switch (action.type) {
//     case 'increment':
//       return { count: state.count + 1 };
//     case 'decrement':
//       return { count: state.count - 1 };
//     default:
//       throw new Error();
//   }
// }
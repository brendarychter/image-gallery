import { createContext, useState, useContext, useEffect } from 'react';
import { User, UserContextType, PropsChildren } from '@/types';

const userInitialState = {
  password: '',
  name: '',
  loggedIn: false
};

const UserContext = createContext<UserContextType>({
  user: userInitialState,
  updateUser: () => {},
  clearStorage: () => {}
});

export const UserProvider = ({ children }: PropsChildren) => {
  const [user, setUser] = useState(() => {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : userInitialState;
  });

  const { loggedIn, name } = user;

  useEffect(() => {
    localStorage.setItem(
      'user',
      JSON.stringify({ name: name, loggedIn: loggedIn })
    );
  }, [loggedIn, localStorage]);

  const updateUser = (prop: string, value: string | boolean) => {
    setUser((user: User) => ({
      ...user,
      [prop]: value
    }));
  };

  const clearStorage = () => {
    setUser(userInitialState);
    localStorage.clear();
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearStorage }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

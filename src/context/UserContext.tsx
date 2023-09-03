import { createContext, useState, useContext, useEffect } from 'react';
import { User, UserContextType, PropsChildren } from '@/types';

const userInitialState = {
  password: '',
  name: '',
  loggedIn: JSON.parse(localStorage.getItem('loggedIn')!)
};

const UserContext = createContext<UserContextType>({
  user: userInitialState,
  updateUser: () => {}
});

export const UserProvider = ({ children }: PropsChildren) => {
  const [user, setUser] = useState<User>(userInitialState);

  const { loggedIn } = user;

  useEffect(() => {
    localStorage.setItem('loggedIn', JSON.stringify(loggedIn));
  }, [loggedIn]);

  const updateUser = (prop: string, value: string | boolean) => {
    setUser((user: User) => ({
      ...user,
      [prop]: value
    }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

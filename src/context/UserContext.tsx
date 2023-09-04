import { createContext, useState, useContext, useEffect } from 'react';
import { User, UserContextType, PropsChildren } from '@/types';

const storage = JSON.parse(localStorage.getItem('user')!);

const userInitialState = {
  password: '',
  name: storage !== null ? storage.name : '',
  loggedIn: storage !== null ? storage.loggedIn : false
};

const UserContext = createContext<UserContextType>({
  user: userInitialState,
  updateUser: () => {}
});

export const UserProvider = ({ children }: PropsChildren) => {
  const [user, setUser] = useState<User>(userInitialState);
  const { loggedIn, name } = user;

  useEffect(() => {
    localStorage.setItem(
      'user',
      JSON.stringify({ name: name, loggedIn: loggedIn })
    );
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

import { createContext, useState, useContext, useEffect } from 'react';
import { User } from '@/types';

const UserContext = createContext<any>(null);

interface Authentication {
  children?: React.ReactNode;
}

export const UserProvider = ({ children }: Authentication) => {
  const [user, setUser] = useState<User>({
    password: '',
    name: '',
    loggedIn: JSON.parse(localStorage.getItem('loggedIn')!),
  });

  const { password, name, loggedIn } = user;
  
  useEffect(()=>{
    localStorage.setItem('loggedIn', JSON.stringify(loggedIn))
  }, [loggedIn])

  return (
    <UserContext.Provider value={{ password, name, loggedIn, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

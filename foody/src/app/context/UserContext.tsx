import axios from 'axios';
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useNotificationContext } from './NotificationContext';

interface UserContextType {
  token: string | null;
  userData: any; // Replace with your user data type
  setToken: (token: string) => void;
  setUserData: (userData: any) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token') || null);
  const [userData, setUserData] = useState<any>(null);
  const { setErrorMessage } = useNotificationContext(); // Get the context methods

  // Fetch user data if token is available
  useEffect(() => {
    if (token) {
      async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_CURRENT_USER}`,
            {
              headers: { 'Authorization': `Bearer ${token}` },
            }
          );
          if (response.status === 200) {
            console.log('response', response);
            setUserData(response.data);
          }
        } catch (err) {
          setErrorMessage('Failed to fetch data');
        }
      }
    }
  }, [token]);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUserData(null);
  };

  return (
    <UserContext.Provider value={{ token, userData, setToken, setUserData, logout }}>
      {children}
    </UserContext.Provider>
  );
};

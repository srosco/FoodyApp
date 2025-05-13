"use client";

import axios from 'axios';
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { useNotificationContext } from './NotificationContext';
import { useRouter } from 'next/navigation';

interface UserContextType {
  token: string | null;
  userData: any; // Replace with a specific user data type if possible
  setToken: (token: string) => void;
  setUserData: (userData: any) => void;
  logout: () => void;
  loading: boolean; // ✅ New
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(typeof window !== "undefined" ? localStorage.getItem('token') : null);
  const [userData, setUserData] = useState<any>(null);
  const { setErrorMessage } = useNotificationContext();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (token) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_CURRENT_USER}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (response.status === 200) {
            setUserData(response.data);
          }
        } catch (err) {
          // setErrorMessage('No user token found');
        }
        finally {
          setLoading(false); // ✅ Done loading
        }
      };

      fetchUser(); // ✅ You were missing this call
    } else {
      setLoading(false); // ✅ No token, but still done loading
    }
  }, [token, setErrorMessage]);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUserData(null);
  };

  return (
    <UserContext.Provider value={{ loading, token, userData, setToken, setUserData, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// ✅ Safe custom hook
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

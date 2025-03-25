// context/NotificationContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NotificationContextType {
  successMessage: string | null;
  errorMessage: string | null;
  setSuccessMessage: (message: string) => void;
  setErrorMessage: (message: string) => void;
  clearMessages: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotificationContext = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const clearMessages = () => {
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  return (
    <NotificationContext.Provider value={{ successMessage, errorMessage, setSuccessMessage, setErrorMessage, clearMessages }}>
      {children}
    </NotificationContext.Provider>
  );
};

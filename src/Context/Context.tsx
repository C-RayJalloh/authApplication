import React, { FC, createContext, useState, PropsWithChildren } from 'react';
import service from '../API/service';

// Type definition for the context
type AppContextType = {
  appwrite: service;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

// Created context with default values
export const AppwriteContext = createContext<AppContextType>({
  appwrite: new service(),
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

// Context provider component
export const AppwriteProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const defaultValue = {
    appwrite: new service(),
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <AppwriteContext.Provider value={defaultValue}>
      {children}
    </AppwriteContext.Provider>
  );
};

'use client';
// contexts/UserContext.js
import { createContext, useState, useContext, ReactNode } from "react";
import { IUser } from "../interface/User";

// Define the type for the context value
interface IUserContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

// Create the context
const UserContext = createContext<IUserContext | undefined>(undefined);

// Define the provider's props type
interface UserProviderProps {
  children: ReactNode;
}

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUserContext = (): IUserContext => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
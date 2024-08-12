// context/UserContext.tsx
import { createContext, useContext } from "react";

type ContextType = {};

export const UserContext = createContext<ContextType | undefined>(undefined);

export const useUser = (): ContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// context/UserContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { getServerSession } from "next-auth";
import { Session } from "next-auth"; // Import the correct type for session

type ContextType = {};

export const UserContext = createContext<ContextType | undefined>(undefined);

export const useUser = (): ContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

import { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the context state
interface PaginationContextType {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  setTotalPages: (total: number) => void;
}

// Create the context with an initial value of undefined
const PaginationContext = createContext<PaginationContextType | undefined>(undefined);

// Define the props for the provider component
interface PaginationProviderProps {
  children: ReactNode;
}

// Create the provider component
export const PaginationProvider = ({ children }: PaginationProviderProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  return (
    <PaginationContext.Provider value={{ currentPage, setCurrentPage, totalPages, setTotalPages }}>
      {children}
    </PaginationContext.Provider>
  );
};

// Create a custom hook for accessing the context
export const usePagination = (): PaginationContextType => {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error("usePagination must be used within a PaginationProvider");
  }
  return context;
};

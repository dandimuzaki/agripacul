import { createContext, useContext } from 'react';

export const ProductsContext = createContext();

export const useProduct = () => useContext(ProductsContext);
import { createContext, useContext } from 'react';

export const ImageContext = createContext();

export const useImage = () => useContext(ImageContext);
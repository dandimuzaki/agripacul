import { createContext, useContext } from 'react';

export const CheckoutContext = createContext();

export const useCheckout = () => useContext(CheckoutContext);
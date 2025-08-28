import { createContext, useContext } from "react";

export const ShippingContext = createContext();

export const useShipping = () => useContext(ShippingContext);
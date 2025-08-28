import { createContext, useContext } from "react";

export const PaymentContext = createContext()

export const usePayment = () => useContext(PaymentContext)
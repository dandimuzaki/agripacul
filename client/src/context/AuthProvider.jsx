import { createAccount, login } from '@/services/authService';
import { AuthContext } from './AuthContext';
import { toast } from 'sonner';
import { useState } from 'react';
export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleRegister = async (data) => {
    setIsLoading(true);
    try {
      await createAccount(data);
    } catch (err) {
      console.error('Register error:', err);
      toast.error(err?.response?.data?.message || 'Failed to register');
    } finally {
      setIsLoading(false);
      console.log(data)
    }
  };

  const handleLogin = async (data) => {
    setIsLoading(true);
    try {
      await login(data);
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
      console.log(data)
    }
  };

  return (
    <AuthContext.Provider value={{
      handleRegister, handleLogin, isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};
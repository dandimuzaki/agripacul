import { createAccount, login } from '@/services/authService';
import { AuthContext } from './AuthContext';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
  }, []);

  const handleRegister = async (data) => {
    setIsLoading(true);
    try {
      const newUser = await createAccount(data);
      setUser(newUser.user);
      setToken(newUser.token);
      localStorage.setItem('user', JSON.stringify(newUser.user));
      localStorage.setItem('token', newUser.token);
    } catch (err) {
      console.error('Register error:', err);
      toast.error(err?.response?.data?.message || 'Failed to register');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (data) => {
    setIsLoading(true);
    try {
      const loggedUser = await login(data);
      setUser(loggedUser.user);
      setToken(loggedUser.token);
      localStorage.setItem('user', JSON.stringify(loggedUser.user));
      localStorage.setItem('token', loggedUser.token);
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      handleRegister, handleLogin, isLoading, user, token
    }}>
      {children}
    </AuthContext.Provider>
  );
};
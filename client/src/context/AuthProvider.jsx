import { createAccount, login, silentLogin } from '@/services/authService';
import { AuthContext } from './AuthContext';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { getAccessToken } from '@/api/axios';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const getNewToken = async () => {
      try {
        const result = await silentLogin();
        if (result) {
          setAccessToken(result.accessToken);
          setUser(result.user);
          getAccessToken(result.accessToken);
        }
      } catch (err) {
        console.error('Failed to silent login', err);
        setAccessToken(null);
        setUser(null);
      } finally {
        setLoadingAuth(false);
      }
    };

    getNewToken();
  }, []);

  const handleLogin = async (data) => {
    setLoadingAuth(true);
    try {
      const res = await login(data);
      console.log(res.accessToken);
      setAccessToken(res.accessToken);
      setUser(res.user);
      getAccessToken(res.accessToken);
      navigate('/');
    } catch (err) {
      console.error('Error login', err);
    } finally {
      setLoadingAuth(false);
    }
  };

  const handleRegister = async (data) => {
    setLoadingAuth(true);
    try {
      const res = await createAccount(data);
      console.log(res.accessToken);
      setAccessToken(res.accessToken);
      setUser(res.user);
      getAccessToken(res.accessToken);
      navigate('/');
    } catch (err) {
      console.error('Error register', err);
    } finally {
      setLoadingAuth(false);
    }
  };

  // 🔴 Logout function
  const handleLogout = async () => {
    await api.post('/auth/logout');
    localStorage.removeItem('accessToken');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        handleLogin,
        loadingAuth,
        user,
        handleRegister,
        accessToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

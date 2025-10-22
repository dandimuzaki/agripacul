import { createAccount, login, silentLogin } from '@/services/authService';
import { AuthContext } from './AuthContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { getAccessToken } from '@/api/axios';
import Cookies from 'js-cookie';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(null);
  const [logged, setLogged] = useState(false);

  const getNewToken = async () => {
    try {
      setLoadingAuth(true);
      const result = await silentLogin();
      if (result) {
        setAccessToken(result.accessToken);
        setUser(result.user);
        setLogged(true);
        getAccessToken(result.accessToken);
      } else {
        setLogged(false);
      }
    } catch (err) {
      console.error('Failed to silent login', err);
      setAccessToken(null);
      setUser(null);
      setLogged(false);
    } finally {
      setLoadingAuth(false);
    }
  };

  useEffect(() => {
    const refreshToken = Cookies.get('refreshToken');
    if (!refreshToken) return;
    getNewToken();
  }, []);

  const handleLogin = async (data) => {
    try {
      setLoadingAuth(true);
      const res = await login(data);
      setAccessToken(res.accessToken);
      setUser(res.user);
      setLogged(true);
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
      setLogged(true);
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

  const handleLogout = async () => {
    await api.post('/auth/logout');
    setAccessToken(null);
    setUser(null);
    setLogged(false);
    localStorage.removeItem('accessToken');
    navigate('/');
};

  return (
    <AuthContext.Provider
      value={{
        handleLogin,
        loadingAuth,
        user,
        handleRegister,
        accessToken,
        handleLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

import { createAccount, login, silentLogin } from '@/services/authService';
import { AuthContext } from './AuthContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { getAccessToken } from '@/api/axios';
import Cookies from 'js-cookie';
import { checkLoggedIn, clearLoggedIn, setLoggedIn } from '@/utils/authFlags';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(null);

  const getNewToken = async () => {
    try {
      setLoadingAuth(true);
      const result = await silentLogin();
      if (result) {
        setAccessToken(result.accessToken);
        setUser(result.user);
        setLoggedIn(true);
        getAccessToken(result.accessToken);
      } else {
        setLoggedIn(false);
      }
    } catch (err) {
      console.error('Failed to silent login', err);
      setAccessToken(null);
      setUser(null);
      setLoggedIn(false);
    } finally {
      setLoadingAuth(false);
    }
  };

  useEffect(() => {
    const hasLoggedIn = checkLoggedIn();
    if (hasLoggedIn) {
      getNewToken();
    };
  }, []);

  const handleLogin = async (data) => {
    try {
      setLoadingAuth(true);
      const res = await login(data);
      setAccessToken(res.accessToken);
      setUser(res.user);
      setLoggedIn(true);
      getAccessToken(res.accessToken);
      navigate('/');
    } catch (err) {
      setLoggedIn(false);
      console.error('Error login', err);
    } finally {
      setLoadingAuth(false);
    }
  };

  const handleRegister = async (data) => {
    setLoadingAuth(true);
    try {
      const res = await createAccount(data);
      setLoggedIn(true);
      setAccessToken(res.accessToken);
      setUser(res.user);
      getAccessToken(res.accessToken);
      navigate('/');
    } catch (err) {
      setLoggedIn(false);
      console.error('Error register', err);
    } finally {
      setLoadingAuth(false);
    }
  };

  const handleLogout = async () => {
    await api.post('/auth/logout');
    setAccessToken(null);
    setUser(null);
    navigate('/');
    clearLoggedIn();
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

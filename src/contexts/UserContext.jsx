import { createContext, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getToken, tokenValidate, getUser } from '../services/dogsService';

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = useState(null);
  const [login, setLogin] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getUserData = async (token) => {
    const user = await getUser(token);
    setData(user);
    setLogin(true);
  };

  const userLogin = async (username, password) => {
    try {
      setError(null);
      setLoading(true);

      const response = await getToken({
        username: username,
        password: password,
      });

      if (!response.token) throw new Error(`Erro ${response.statusText}`);

      const token = response.token;
      window.localStorage.setItem('token', token);
      await getUserData(token);
      navigate('/conta');
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  };

  const userLogout = useCallback(async () => {
    setData(null);
    setError(null);
    setLoading(false);
    setLogin(false);
    window.localStorage.removeItem('token');
    navigate('/login');
  }, [navigate]);

  useEffect(() => {
    const autoLogin = async () => {
      const token = window.localStorage.getItem('token');

      if (token) {
        try {
          setError(null);
          setLoading(true);
          const response = await tokenValidate(token);

          if (response.code !== 'jwt_auth_valid_token') {
            throw new Error('Token inválido');
          }

          await getUserData(token);
        } catch (err) {
          userLogout();
        } finally {
          setLoading(false);
        }
      }
    };
    autoLogin();
  }, [userLogout]);

  return (
    <UserContext.Provider
      value={{ userLogin, userLogout, data, error, loading, login }}
    >
      {children}
    </UserContext.Provider>
  );
};

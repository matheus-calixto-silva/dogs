import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Input from '../Input/Input';
import Button from '../Button/Button';
import Error from '../Error/Error';
import Head from '../Head/Head';

import useForm from '../../hooks/useForm.js';
import useFetch from '../../hooks/useFetch.js';

import { passwordReset } from '../../services/dogsService';

const LoginPasswordReset = () => {
  const [login, setLogin] = useState('');
  const [key, setKey] = useState('');
  const navigate = useNavigate();
  const password = useForm('password');
  const { loading, error, request } = useFetch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const login = params.get('login');
    const key = params.get('key');
    if (login && key) {
      setLogin(login);
      setKey(key);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await request(passwordReset, { login, key, password });
    console.log(response);

    if (response) {
      navigate('/login');
    }
  };

  return (
    <div>
      <Head title={'Resetar senha'} />
      <h1 className='title'>Resete a senha</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label={'Nova senha'}
          type={'password'}
          name={'password'}
          {...password}
        />
        {loading ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Resetar</Button>
        )}
      </form>
      <Error error={error}></Error>
    </div>
  );
};

export default LoginPasswordReset;

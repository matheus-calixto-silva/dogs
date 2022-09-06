import { useContext } from 'react';

import Input from '../Input/Input';
import Button from '../Button/Button';
import Error from '../Error/Error';

import useForm from '../../hooks/useForm';
import useFetch from '../../hooks/useFetch';

import { UserContext } from '../../contexts/UserContext';

import { createUser } from '../../services/dogsService';

const LoginCreate = () => {
  const username = useForm();
  const email = useForm('email');
  const password = useForm('password');

  const { userLogin } = useContext(UserContext);

  const { loading, error, request } = useFetch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const req = await request(createUser, {
      username: username.value,
      email: email.value,
      password: password.value,
    });

    if (typeof req.response === 'number') userLogin(username.value, password.value);
  };

  return (
    <section className='animeLeft'>
      <h1 className='title'>Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label={'Usuário'}
          type={'text'}
          name={'username'}
          {...username}
        />
        <Input label={'Email'} type={'email'} name={'email'} {...email} />
        <Input
          label={'Senha'}
          type={'password'}
          name={'password'}
          {...password}
        />
        {loading ? (
          <Button disabled>Cadastrando...</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}
        <Error error={error} />
      </form>
    </section>
  );
};

export default LoginCreate;

import { useContext } from 'react';
import { Link } from 'react-router-dom';

import Input from '../Input/Input';
import Button from '../Button/Button';
import Error from '../Error/Error';
import Head from '../Head/Head';

import { UserContext } from '../../contexts/UserContext';

import useForm from '../../hooks/useForm';

import styles from './LoginForm.module.css';
import stylesBtn from '../Button/Button.module.css';

const LoginForm = () => {
  const username = useForm();
  const password = useForm();

  const { userLogin, error, loading } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
    }
  };

  return (
    <section className='animeLeft'>
      <Head title={'Login'} />
      <h1 className='title'>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          label={'Usuário'}
          type={'text'}
          name={'username'}
          {...username}
        />
        <Input
          label={'Senha'}
          type={'password'}
          name={'password'}
          {...password}
        />
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Entrar</Button>
        )}
        <Error error={error && 'Dados incorretos.'} />
      </form>
      <Link className={styles.perdeu} to={'/login/perdeu'}>
        Perdeu a senha?
      </Link>{' '}
      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>ainda não possui conta? cadastre-se no site</p>
        <Link className={stylesBtn.button} to={'/login/criar'}>
          Cadastro
        </Link>{' '}
      </div>
    </section>
  );
};

export default LoginForm;

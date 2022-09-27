import Input from '../Input/Input';
import Button from '../Button/Button';
import Error from '../Error/Error';
import Head from '../Head/Head';

import useForm from '../../hooks/useForm.js';
import useFetch from '../../hooks/useFetch.js';

import { passwordLost } from '../../services/dogsService';

const LoginPasswordLost = () => {
  const login = useForm('');
  const { data, loading, error, request } = useFetch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await request(passwordLost, {
      login: login.value,
      url: window.location.href.replace('perdeu', 'resetar'),
    });
  };

  return (
    <section className='animeLeft'>
      <Head title={'Perdeu a senha'} />
      <h1 className='title'>Perdeu a senha?</h1>
      {data ? (
        <p style={{ color: '#4c1' }}>{data}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input
            label={'Email / Usuário'}
            type={'text'}
            name={'login'}
            {...login}
          />
          {loading ? (
            <Button disabled>Enviando...</Button>
          ) : (
            <Button>Enviar email</Button>
          )}
        </form>
      )}
      {<Error error={error} />}
    </section>
  );
};

export default LoginPasswordLost;

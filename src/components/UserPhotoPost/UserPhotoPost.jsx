import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Input from '../Input/Input';
import Button from '../Button/Button';
import Error from '../Error/Error';

import useForm from '../../hooks/useForm';
import useFetch from '../../hooks/useFetch';

import { photoPost } from '../../services/dogsService';

import styles from './UserPhotoPost.module.css';
import { useEffect } from 'react';

const UserPhotoPost = () => {
  const nome = useForm();
  const peso = useForm('number');
  const idade = useForm('number');
  const [img, setImg] = useState({});
  const { data, error, loading, request } = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) navigate('/conta');
  }, [data, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('img', img.raw);
    formData.append('nome', nome.value);
    formData.append('peso', peso.value);
    formData.append('idade', idade.value);

    await request(photoPost, formData);
  };

  const handleImgChange = ({ target }) => {
    setImg({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0],
    });
  };

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <form onSubmit={handleSubmit}>
        <Input label={'Nome'} type={'text'} name={'nome'} {...nome} />
        <Input label={'Peso'} type={'number'} name={'peso'} {...peso} />
        <Input label={'Idade'} type={'number'} name={'idade'} {...idade} />
        <input
          className={styles.file}
          type='file'
          name='img'
          id='img'
          onChange={handleImgChange}
        />
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Enviar</Button>
        )}
        <Error error={error} />
      </form>
      {img.preview && (
        <div
          className={styles.preview}
          style={{ backgroundImage: `url('${img.preview}')` }}
        ></div>
      )}
    </section>
  );
};

export default UserPhotoPost;

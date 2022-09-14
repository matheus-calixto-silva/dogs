import { useState } from 'react';

import useFetch from '../../hooks/useFetch';

import { commentPhoto } from '../../services/dogsService';

import { ReactComponent as Enviar } from '../../assets/enviar.svg';

import styles from './PhotoCommentsForm.module.css';

const PhotoCommentsForm = ({ id, setComments }) => {
  const [comment, setComment] = useState('');
  const { request, error } = useFetch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await request(commentPhoto, { id, comment: { comment } });

    if (typeof response === 'object' && response.comment_approved === '1') {
      setComment('');
      setComments((comments) => [...comments, response]);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        className={styles.textarea}
        id='comment'
        name='comment'
        placeholder='Comente...'
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      ></textarea>
      <button className={styles.button}>
        <Enviar />
      </button>
    </form>
  );
};

export default PhotoCommentsForm;

import { useEffect } from 'react';

import Error from '../Error/Error';
import Loading from '../Loading/Loading';
import PhotoContent from '../PhotoContent/PhotoContent';

import useFetch from '../../hooks/useFetch';

import { getPhoto } from '../../services/dogsService';

import styles from './FeedModal.module.css';

const FeedModal = ({ photo, setModalPhoto }) => {
  const { data, error, loading, request } = useFetch();

  useEffect(() => {
    request(getPhoto, photo.id);
  }, [photo, request]);

  const handleOutsideClick = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      setModalPhoto(null);
    }
  };

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      {error && <Error error={error} />}
      {loading && <Loading />}
      {data && <PhotoContent data={data} />}
    </div>
  );
};

export default FeedModal;

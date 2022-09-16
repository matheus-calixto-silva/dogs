import { useEffect } from 'react';

import FeedPhotosItem from '../FeedPhotosItem/FeedPhotosItem';
import Error from '../Error/Error';
import Loading from '../Loading/Loading';

import useFetch from '../../hooks/useFetch';

import { getPhotos } from '../../services/dogsService';

import styles from './FeedPhotos.module.css';

const FeedPhotos = ({ user, page, setModalPhoto, setInfinite }) => {
  const { data, loading, error, request } = useFetch();

  useEffect(() => {
    const fetchPhotos = async () => {
      const total = 3;
      const response = await request(getPhotos, {
        page,
        total,
        user,
      });

      if (response && response.length < total) {
        setInfinite(false);
      }
    };
    fetchPhotos();
  }, [request, user, page, setInfinite]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data)
    return (
      <div className={`${styles.feed} animeLeft`}>
        {data.map((photo) => (
          <FeedPhotosItem
            key={photo.id}
            photo={photo}
            setModalPhoto={setModalPhoto}
          />
        ))}
      </div>
    );
  else return null;
};

export default FeedPhotos;

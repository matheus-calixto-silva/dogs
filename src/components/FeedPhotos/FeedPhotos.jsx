import { useEffect } from 'react';

import FeedPhotosItem from '../FeedPhotosItem/FeedPhotosItem';
import Error from '../Error/Error';
import Loading from '../Loading/Loading';

import useFetch from '../../hooks/useFetch';

import { getPhotos } from '../../services/dogsService';

import styles from './FeedPhotos.module.css';

const FeedPhotos = () => {
  const { data, loading, error, request } = useFetch();

  useEffect(() => {
    const fetchPhotos = async () => {
      const req = await request(getPhotos, { page: 1, total: 6, user: 0 });
      console.log(req);
    };
    fetchPhotos();
  }, [request]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data)
    return (
      <div className={`${styles.feed} animeLeft`}>
        {data.map((photo) => (
          <FeedPhotosItem key={photo.id} photo={photo} />
        ))}
      </div>
    );
  else return null;
};

export default FeedPhotos;

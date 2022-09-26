import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Error from '../Error/Error';
import Loading from '../Loading/Loading';
import PhotoContent from '../PhotoContent/PhotoContent';
import Head from '../Head/Head';

import useFetch from '../../hooks/useFetch';

import { getPhoto } from '../../services/dogsService';

const Photo = () => {
  const { id } = useParams();
  const { data, loading, error, request } = useFetch();

  useEffect(() => {
    const photo = async () => {
      await request(getPhoto, id);
    };
    photo();
  }, [id, request]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data)
    return (
      <section className='container mainContainer'>
        <Head title={data.photo.title} />
        <PhotoContent data={data} single={true} />
      </section>
    );
  else return null;
};

export default Photo;

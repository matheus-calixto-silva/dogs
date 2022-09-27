import { useEffect, lazy, Suspense } from 'react';

import Head from '../Head/Head';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
const UserStatsGraphs = lazy(() =>
  import('../UserStatsGraphs/UserStatsGraphs')
);

import useFetch from '../../hooks/useFetch';

import { getStats } from '../../services/dogsService';

const UserStats = () => {
  const { data, error, loading, request } = useFetch();

  useEffect(() => {
    const getData = async () => {
      const token = window.localStorage.getItem('token');
      await request(getStats, token);
    };
    getData();
  }, [request]);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  if (data)
    return (
      <Suspense fallback={<div></div>}>
        <Head title={'Estatisticas'} />
        <UserStatsGraphs data={data} />
      </Suspense>
    );
  else return null;
};

export default UserStats;

import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import Feed from '../Feed/Feed.jsx';
import UserHeader from '../UserHeader/UserHeader';
import UserPhotoPost from '../UserPhotoPost/UserPhotoPost.jsx';
import UserStats from '../UserStats/UserStats';
import NotFound from '../NotFound/NotFound.jsx';
import Head from '../Head/Head.jsx';

import { UserContext } from '../../contexts/UserContext';

const User = () => {
  const { data } = useContext(UserContext);

  return (
    <section className='container'>
      <UserHeader />
      <Head title={'Minha Conta'}/>
      <Routes>
        <Route path='/' element={<Feed user={data.id} />} />
        <Route path='/postar' element={<UserPhotoPost />} />
        <Route path='/estatisticas' element={<UserStats />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </section>
  );
};

export default User;

import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import Feed from '../Feed/Feed.jsx';
import UserHeader from '../UserHeader/UserHeader';
import UserPhotoPost from '../UserPhotoPost/UserPhotoPost.jsx';
import UserStats from '../UserStats/UserStats';

import { UserContext } from '../../contexts/UserContext';

const User = () => {
  const { data } = useContext(UserContext);

  return (
    <section className='container'>
      <UserHeader />
      <Routes>
        <Route path='/' element={<Feed user={data.id} />} />
        <Route path='/postar' element={<UserPhotoPost />} />
        <Route path='/estatisticas' element={<UserStats />} />
      </Routes>
    </section>
  );
};

export default User;

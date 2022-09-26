import { useParams } from 'react-router-dom';

import Feed from '../Feed/Feed';
import Head from '../Head/Head';

const UserProfile = () => {
  const { user } = useParams();

  return (
    <div className='container mainContainer'>
      <Head title={user} />
      <h1 className='title'>{user}</h1>
      <Feed user={user} />
    </div>
  );
};

export default UserProfile;

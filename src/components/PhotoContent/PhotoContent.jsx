import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from '../../contexts/UserContext';

import Image from '../Image/Image';
import PhotoComments from '../PhotoComments/PhotoComments';
import PhotoDelete from '../PhotoDelete/PhotoDelete';

import styles from './PhotoContent.module.css';

const PhotoContent = ({ data, single }) => {
  const user = useContext(UserContext);
  const { photo, comments } = data;

  return (
    <div className={`${styles.photo} ${single ? styles.single : ''}`}>
      <div className={styles.img}>
        <Image src={photo.src} alt={photo.title} />
      </div>
      <div className={styles.details}>
        <div>
          <p className={styles.author}>
            {user.data && user.data.username === photo.author ? (
              <PhotoDelete id={photo.id} />
            ) : (
              <Link to={`/perfil/${photo.author}`}>@{photo.author}</Link>
            )}
            <span className={styles.visualizacoes}>{photo.acessos}</span>
          </p>
          <h1 className='title'>
            <Link to={`/foto/${photo.id}`}>{photo.title}</Link>
          </h1>
          <ul className={styles.attributes}>
            <li>{photo.peso} kg</li>
            {photo.idade === 1 ? (
              <li>{photo.idade} ano</li>
            ) : (
              <li>{photo.idade} anos</li>
            )}
          </ul>
        </div>
      </div>
      <PhotoComments id={photo.id} comments={comments} single={single} />
    </div>
  );
};

export default PhotoContent;

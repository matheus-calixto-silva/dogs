import styles from './PhotoDelete.module.css';

import { deletePhoto } from '../../services/dogsService';
import useFetch from '../../hooks/useFetch';

const PhotoDelete = ({ id }) => {
  const { loading, request } = useFetch();

  const handleClick = async () => {
    const confirmed = window.confirm(
      'Tem certeza que deseja excluir essa foto?'
    );

    if (confirmed) {
      const response = await request(deletePhoto, id);
      if (response) window.location.reload();
    }
  };

  return (
    <>
      {loading ? (
        <button disabled className={styles.delete}>
          Deletar
        </button>
      ) : (
        <button onClick={handleClick} className={styles.delete}>
          Deletar
        </button>
      )}
    </>
  );
};

export default PhotoDelete;

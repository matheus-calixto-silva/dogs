import { useState } from 'react';
import FeedModal from '../FeedModal/FeedModal';
import FeedPhotos from '../FeedPhotos/FeedPhotos';

const Feed = () => {
  const [modalPhoto, setModalPhoto] = useState('');

  return (
    <section>
      {modalPhoto && (
        <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />
      )}
      <FeedPhotos setModalPhoto={setModalPhoto} />
    </section>
  );
};

export default Feed;

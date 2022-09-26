import Feed from '../Feed/Feed';
import Head from '../Head/Head';

const Home = () => {
  return (
    <section className='container mainContainer'>
      <Head title={'Home'} description={'Dogs, feed'}/>
      <Feed />
    </section>
  );
};

export default Home;

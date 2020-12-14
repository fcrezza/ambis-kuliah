import HomeFeat from 'features/home';
import Head from 'components/Head';

function Home() {
  return (
    <>
      <Head
        title="Beranda - Ambis Kuliah"
        description="Ambis kuliah homepage"
      />
      <HomeFeat />
    </>
  );
}

export default Home;

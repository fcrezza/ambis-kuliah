import Head from 'components/Head';
import Footer from 'components/Footer';
import Topics from 'features/topics';

function topics() {
  return (
    <>
      <Head
        title="Ikuti Topik - Pilih topik yang ingin kamu ikuti"
        description="Ikuti topik, diskusi tentang topik terkait akan mancul dihalaman utama kamu."
      />
      <Topics />
      <Footer />
    </>
  );
}

export default topics;

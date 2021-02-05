import Head from 'components/Head';
import Topics from 'features/signupTopics';

function topics() {
  return (
    <>
      <Head
        title="Ikuti Topik - Pilih topik yang ingin kamu ikuti"
        description="Ikuti topik, diskusi tentang topik terkait akan mancul dihalaman utama kamu."
      />
      <Topics />
    </>
  );
}

export default topics;

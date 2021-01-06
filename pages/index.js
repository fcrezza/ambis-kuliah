import Head from 'components/Head';
import LandingFeat from 'features/landingPage';

function LandingPage() {
  return (
    <>
      <Head
        title="Ambis Kuliah - Biarkan orang lain tahu, bagikan dan diskusikan hal apa yang membuat kamu berambisi"
        description="Biarkan orang lain tahu, bagikan dan diskusikan hal apa yang membuat kamu berambisi"
      />
      <LandingFeat />
    </>
  );
}

export default LandingPage;

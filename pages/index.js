import Head from 'components/Head';
import Footer from 'components/Footer';
import {
  LandingAbout,
  LandingFeatures,
  LandingHeader,
  LandingJoin
} from 'features/landingPage';

function LandingPage() {
  return (
    <>
      <Head
        title="Ambis Kuliah - Biarkan orang lain tahu, bagikan dan diskusikan hal apa yang membuat kamu berambisi"
        description="Biarkan orang lain tahu, bagikan dan diskusikan hal apa yang membuat kamu berambisi"
      />
      <LandingHeader />
      <LandingFeatures />
      <LandingAbout />
      <LandingJoin />
      <Footer />
    </>
  );
}

export default LandingPage;

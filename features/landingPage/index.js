import LandingHeader from './LandingHeader';
import LandingAbout from './LandingAbout';
import LandingFeatures from './LandingFeatures';
import LandingJoin from './LandingJoin';
import Footer from 'components/Footer';
import useRoute from 'utils/route';

function Landing() {
  // eslint-disable-next-line
  const route = useRoute('/home', null);
  return (
    <>
      <LandingHeader />
      <LandingFeatures />
      <LandingAbout />
      <LandingJoin />
      <Footer />
    </>
  );
}

export default Landing;

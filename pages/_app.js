import 'normalize.css';
import 'fontsource-inter/400-normal.css';
import 'fontsource-inter/500-normal.css';
import 'fontsource-inter/700-normal.css';

import Navigation from 'components/Navigation';
import {GlobalStyle} from 'utils/styles/Global';
import {ThemeProvider} from 'utils/styles/Theme';

function MyApp({Component, pageProps}) {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <Navigation />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;

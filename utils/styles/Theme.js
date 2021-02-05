import {ThemeProvider as StyledThemeProvider} from 'styled-components';

const colors = {
  'black.50': '#555',
  'black.100': '#333',
  'black.150': '#222',
  'gray.50': '#f9f9f9',
  'gray.100': '#d9d9d9',
  'gray.150': '#eee',
  'white.50': '#fff',
  'orange.50': '#FF9A76',
  'red.50': '#f5587b'
};

export function ThemeProvider({children}) {
  const theme = {colors};

  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
}

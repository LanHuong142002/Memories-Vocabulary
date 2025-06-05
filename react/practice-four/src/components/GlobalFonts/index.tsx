import { Global } from '@mantine/core';

// Fonts
import helveticaNeueBold from '@assets/fonts/HelveticaNeue-Bold.otf';
import helveticaNeueSemiBold from '@assets/fonts/HelveticaNeue-Semibold.otf';
import helveticaNeueRegular from '@assets/fonts/HelveticaNeue-Regular.otf';
import helveticaNeueLight from '@assets/fonts/HelveticaNeue-Light.otf';

const GlobalFonts = () => (
  <Global
    styles={[
      {
        '@font-face': {
          fontFamily: 'HelveticaNeue',
          src: `url('${helveticaNeueBold}') format("opentype")`,
          fontWeight: 700,
          fontStyle: 'normal',
          fontDisplay: 'swap',
        },
      },
      {
        '@font-face': {
          fontFamily: 'HelveticaNeue',
          src: `url('${helveticaNeueSemiBold}') format("opentype")`,
          fontWeight: 500,
          fontStyle: 'normal',
          fontDisplay: 'swap',
        },
      },
      {
        '@font-face': {
          fontFamily: 'HelveticaNeue',
          src: `url('${helveticaNeueRegular}') format("opentype")`,
          fontWeight: 400,
          fontStyle: 'normal',
          fontDisplay: 'swap',
        },
      },
      {
        '@font-face': {
          fontFamily: 'HelveticaNeue',
          src: `url('${helveticaNeueLight}') format("opentype")`,
          fontWeight: 300,
          fontStyle: 'normal',
          fontDisplay: 'swap',
        },
      },
    ]}
  />
);

export default GlobalFonts;

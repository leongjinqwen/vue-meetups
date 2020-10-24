import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdiSvg',
  },
  theme: {
    dark: false,
    themes: {
      // if dark is false, set default color class as below
      light: {
        primary: colors.indigo,
        secondary: colors.blueGrey.darken3,
        success:colors.green.accent2,
        warning:colors.yellow.darken2,
        info:colors.cyan.darken1,
        accent: colors.grey.lighten4, 
        error: colors.red.accent3,
      },
      // if dark is true, set default color class as below
      dark: {
        primary: colors.blueGrey.darken2,
        success:colors.green.accent2,
        secondary: colors.blueGrey.lighten2,
        accent: colors.blueGrey.darken3,
      },
    },
  },
})
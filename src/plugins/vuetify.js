import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import pt from 'vuetify/es5/locale/pt'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: '#ff5722',
        secondary: '#ff9800',
        accent: '#3f51b5',
        error: '#f44336',
        warning: '#ffeb3b',
        info: '#00bcd4',
        success: '#4caf50'
      }
    }
  },
  lang: {
    locales: {
      pt
    },
    current: 'pt'
  },
  icons: {
    iconfont: 'md'
  }
})

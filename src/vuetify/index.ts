import 'vuetify/styles' // Import Vuetify styles
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'myCustomTheme',
    themes: {
      myCustomTheme: {
        dark: false,
        colors: {
          // primary colors
          'primary-blue': '#2F80ED',
          'primary-gray': '#828282',
          'primary-light-gray': '#E0E0E0',
          'primary-dark-gray': '#4F4F4F',
          // indicator colors
          'indicator-purple': '#8785FF',
          'indicator-red': '#EB5757',
          'indicator-yellow': '#F2C94C',
          'indicator-orange': '#F8B76B',
          // chat colors
          'chat-cream': '#FCEED3',
          'chat-orange': '#E5A443',
          'chat-light-purple': '#EEDCFF',
          'chat-dark-purple': '#9B51E0',
          'chat-light-green': '#D2F2EA',
          'chat-green': '#43B78D',
          // sticker colors
          'sticker-light-blue': '#E9F3FF',
          'sticker-peach': '#FDCFA4',
          'sticker-light-yellow': '#F9E9C3',
          'sticker-light-green': '#AFEBDB',
          'sticker-bright-green': '#CBF1C2',
          'sticker-light-purple': '#CFCEF9',
          'sticker-light-pink': '#F9E0FD'
        }
      }
    }
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  }
})

export default vuetify

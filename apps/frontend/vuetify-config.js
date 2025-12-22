import '@mdi/font/css/materialdesignicons.css'
import colors from 'vuetify/util/colors'
import { md2 } from 'vuetify/blueprints'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'

export default createVuetify({
  blueprint: md2,
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        dark: true,
        colors: {
          primary: colors.indigo.base,
          // secondary: 'red',
          // success,
          // info,
          // warning,
          // error,
          // surface,
          // background,
        },
      },
    },
  },
  defaults: {
    global: {},
    VAppBar: {
      color: 'primary',
      elevation: 3,
      scrollBehavior: 'fully-hide',
      scrollThreshold: '140',
    },
    VTabs: {
      grow: true,
      color: 'indigo-lighten-5',
      bgColor: 'indigo-lighten-1',
    },
    VTab: {
      rounded: 0,
    },
    VBreadcrumbs: {
      bgColor: 'indigo-lighten-2',
    },
    VForm: {
      VBtn: {
        block: true,
        size: 'x-large',
      },
    },
  },
})

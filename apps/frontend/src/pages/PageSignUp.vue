<script>
import signUp from '@/api/rest/auth/signUp.js'
import CardSuccess from '@/ui/CardSuccess.vue'
import FormSheet from '@/ui/FormSheet.vue'
import TurboFormNew from '@/ui/TurboFormNew.vue'

export default {
  components: { TurboFormNew, FormSheet, CardSuccess },

  data() {
    return {
      title: 'Вы зарегистрированы!',
      text: 'Теперь можете войти, используя ваш логин и пароль',
      isOk: false,
      cols: 12,
      sizing: { cols: 12, sm: 8, md: 6, xl: 4 },
      fields: {
        nickname: null,
        password: null,
        repasswd: null,
        email: null,
        phone: null,
        country: {
          component: 'v-select',
          list: ['California', 'Florida', 'Texas'],
        },
        isAgree: 'v-checkbox',
      },
    }
  },
  methods: {
    add: signUp,
    initTest() {
      return {
        nickname: 'xxx',
        password: 'xX1!xxxx',
        repasswd: 'xX1!xxxx',
        email: 'xxx@xx.xx',
        phone: '+380334445566',
        country: 'xxxxx',
        isAgree: true,
      }
    },
  },
}
</script>

<template>
  <FormSheet caption="Sign-up" :sizing>
    <CardSuccess v-if="isOk" :title :text link="/sign-in" ankhor="Войти" />
    <TurboFormNew
      v-else
      :add
      :cols
      :fields
      :init-test
      @submitted="isOk = true"
    />
  </FormSheet>
</template>

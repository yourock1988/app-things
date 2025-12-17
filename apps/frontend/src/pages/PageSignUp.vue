<script>
import signUp from '@/api/rest/auth/signUp.js'
import CardSuccess from '@/ui/CardSuccess.vue'
import FormSheet from '@/ui/FormSheet.vue'
import TurboForm from '@/ui/TurboForm.vue'

export default {
  components: { TurboForm, FormSheet, CardSuccess },

  data() {
    return {
      sizing: { cols: 12, sm: 8, md: 6, xl: 4 },
      isOk: false,
      title: 'Вы зарегистрированы!',
      text: 'Теперь можете войти, используя ваш логин и пароль',
      err: null,
      cols: 12,
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
    async submit({ resolve, ...dto }) {
      this.err = null
      const [err] = await signUp(dto)
      this.err = err
      if (!err) this.isOk = true
      resolve()
    },
  },
}
</script>

<template>
  <FormSheet caption="Sign-up" :sizing>
    <CardSuccess v-if="isOk" :title :text link="/sign-in" ankhor="Войти" />
    <TurboForm v-else :fields :err :cols :init-test @submit="submit" />
  </FormSheet>
</template>

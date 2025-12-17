<script>
import { mapActions, mapState } from 'vuex/dist/vuex.cjs.js'
import CardSuccess from '@/ui/CardSuccess.vue'
import FormSheet from '@/ui/FormSheet.vue'
import TurboForm from '@/ui/TurboForm.vue'

export default {
  components: { TurboForm, FormSheet, CardSuccess },

  data() {
    return {
      sizing: { cols: 12, sm: 8, md: 6, xl: 4 },
      title: 'Вы вошли в систему!',
      text: 'Теперь можете юзать приложение под ником',
      cols: 12,
      fields: { nickname: null, password: null },
    }
  },

  computed: {
    ...mapState('auth', ['err', 'session']),
  },

  methods: {
    ...mapActions('auth', ['signIn']),
    initTest() {
      return {
        nickname: 'xxx',
        password: 'xX1!xxxx',
      }
    },
    async submit({ resolve, ...dto }) {
      await this.signIn(dto)
      resolve()
    },
  },
}
</script>

<template>
  <FormSheet caption="Sign-in" :sizing>
    <CardSuccess v-if="session" :title :text link="/cars" ankhor="Юзать">
      <b>{{ session.nickname }}</b>
    </CardSuccess>
    <TurboForm v-else :fields :err :cols :init-test @submit="submit" />
  </FormSheet>
</template>

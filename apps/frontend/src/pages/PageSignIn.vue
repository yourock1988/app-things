<script>
import { mapMutations, mapState } from 'vuex/dist/vuex.cjs.js'
import CardSuccess from '@/ui/CardSuccess.vue'
import FormSheet from '@/ui/FormSheet.vue'
import TurboForm from '@/ui/TurboForm.vue'
import signIn from '@/api/rest/auth/signIn.js'

export default {
  components: { TurboForm, FormSheet, CardSuccess },
  data() {
    return {
      title: 'Вы вошли в систему!',
      text: 'Теперь можете юзать приложение под ником',
      cols: 12,
      sizing: { cols: 12, sm: 8, md: 6, xl: 4 },
      fields: { nickname: null, password: null },
    }
  },
  computed: {
    ...mapState('auth', ['session']),
  },
  methods: {
    // ...mapActions('auth', ['signIn']),
    ...mapMutations('auth', ['SET_SESSION']),
    add: signIn,
    submit(session) {
      this.SET_SESSION(session)
    },
    initTest() {
      return {
        nickname: 'xxx',
        password: 'xX1!xxxx',
      }
    },
  },
}
</script>

<template>
  <FormSheet caption="Sign-in" :sizing>
    <CardSuccess v-if="session" :title :text link="/cars" ankhor="Юзать">
      <b>{{ session.nickname }}</b>
    </CardSuccess>
    <TurboForm v-else :add :cols :fields :init-test @submitted="submit" />
  </FormSheet>
</template>

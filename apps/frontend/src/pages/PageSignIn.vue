<script>
import { mapState } from 'vuex/dist/vuex.cjs.js'
import SignInForm from '@/components/SignInForm.vue'
import CardSuccess from '@/ui/CardSuccess.vue'
import FormSheet from '@/ui/FormSheet.vue'

export default {
  components: { SignInForm, FormSheet, CardSuccess },

  data() {
    return {
      sizing: { cols: 12, sm: 8, md: 6, xl: 4 },
      title: 'Вы вошли в систему!',
      text: 'Теперь можете юзать приложение под ником',
    }
  },

  computed: {
    ...mapState('auth', ['session']),
  },
}
</script>

<template>
  <FormSheet caption="Sign-in" :sizing>
    <CardSuccess v-if="session" :title :text link="/cars" ankhor="Юзать">
      <b>{{ session.nickname }}</b>
    </CardSuccess>
    <SignInForm v-else />
  </FormSheet>
</template>

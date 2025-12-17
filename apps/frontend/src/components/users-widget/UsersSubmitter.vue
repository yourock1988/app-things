<script>
import { mapActions, mapState } from 'vuex'
import FormSheet from '@/ui/FormSheet.vue'
import TurboForm from '@/ui/TurboForm.vue'

export default {
  components: { TurboForm, FormSheet },

  data() {
    return {
      sizing: { cols: 12 },
      cols: 3,
      fields: {
        nickname: null,
        password: null,
        email: null,
      },
    }
  },
  computed: {
    ...mapState('users', ['err']),
  },
  methods: {
    ...mapActions('users', ['createUser']),
    async submit({ resolve, ...dto }) {
      await this.createUser(dto)
      resolve()
    },
    initTest() {
      return {
        nickname: 'Foobar',
        password: 'qwerty123',
        email: 'foobar@mail.xxx',
      }
    },
  },
}
</script>

<template>
  <FormSheet caption="Create car" :sizing>
    <TurboForm :fields :err :cols :init-test @submit="submit" />
  </FormSheet>
</template>

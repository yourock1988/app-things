<script>
import { mapActions, mapState } from 'vuex'
import FormSheet from '../../ui/FormSheet.vue'
import TurboForm from '../../ui/TurboForm.vue'

export default {
  components: { TurboForm, FormSheet },

  data() {
    return {
      sizing: { cols: 12 },
      cols: 3,
      fields: {
        type: null,
        brand: null,
        model: null,
        price: { type: 'number', modify: 'number' },
        engine: null,
        hp: { type: 'number', modify: 'number' },
        hasTurbo: 'v-checkbox',
      },
    }
  },
  computed: {
    ...mapState('accounts', ['err']),
  },
  methods: {
    ...mapActions('accounts', ['createAccount']),
    async submit({ resolve, ...dto }) {
      await this.createAccount(dto)
      resolve()
    },
    initTest() {
      return {
        type: 'Muscle',
        brand: 'Bugatti',
        model: 'Veyron',
        price: 111111,
        engine: 'W16',
        hasTurbo: true,
        hp: 999,
      }
    },
  },
}
</script>

<template>
  <FormSheet caption="Create account" :sizing>
    <TurboForm :fields :err :cols :init-test @submit="submit" />
  </FormSheet>
</template>

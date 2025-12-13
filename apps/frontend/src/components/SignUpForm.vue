<script>
// import { mapActions, mapState } from 'vuex'
import FormField from '@/ui/FormField.vue'
import signUp from '../api/rest/auth/signUp.js'

export default {
  components: { FormField },

  emits: ['success'],

  data() {
    return {
      loading: false,
      l: ['California', 'Florida', 'Texas'],
      dto: this.initDto(),
      err: null,
      cols: 12,
      // err: {
      //   _errors: ['very bad'],
      //   isAgree: {
      //     _errors: ['bad'],
      //   },
      //   country: {
      //     _errors: ['bad'],
      //   },
      // },
    }
  },

  computed: {
    // ...mapState('auth', ['err']),
  },

  methods: {
    // ...mapActions('auth', ['signUp']),

    initDto() {
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

    async handleSubmit() {
      this.loading = true
      this.err = null
      const [err, data] = await signUp({ ...this.dto })
      if (err) {
        this.err = err
      } else {
        this.dto = this.initDto()
        this.$emit('success', data.nickname)
      }
      this.loading = false
    },
  },
}
</script>

<template>
  <v-form @submit.prevent="handleSubmit">
    <v-row class="justify-center">
      <FormField v-model="dto" :err field="nickname" :cols />
      <FormField v-model="dto" :err field="password" :cols />
      <FormField v-model="dto" :err field="repasswd" :cols />
      <FormField v-model="dto" :err field="email" :cols />
      <FormField v-model="dto" :err field="phone" :cols />
      <FormField v-model="dto" :err field="country" comp="v-select" :l :cols />
      <FormField v-model="dto" :err field="isAgree" comp="v-checkbox" :cols />

      <v-col cols="12">
        <v-btn :loading type="submit">Submit</v-btn>
      </v-col>
      <v-col v-if="err?._errors?.length > 0" cols="12">
        <p>{{ err?._errors }}</p>
      </v-col>
    </v-row>
  </v-form>
</template>

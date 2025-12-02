<script>
// import { mapActions, mapState } from 'vuex'
import FormField from '@/components/FormField.vue'

export default {
  components: { FormField },

  data() {
    return {
      isLoading: false,
      items: ['California', 'Florida', 'Texas'],
      dto: this.initDto(),
      err: null,
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
        nickname: '',
        password: '',
        repasswd: '',
        email: '',
        phone: '',
        country: '',
        isAgree: false,
      }
    },

    async handleSubmit() {
      this.isLoading = true
      // await this.signUp({ ...this.dto })
      this.dto = this.initDto()
      this.isLoading = false
    },
  },
}
</script>

<template>
  <v-form @submit.prevent="handleSubmit">
    <v-row class="justify-center">
      <v-col cols="12">
        <FormField v-model="dto" :err field="nickname" />
      </v-col>
      <v-col cols="12">
        <FormField v-model="dto" :err field="password" />
      </v-col>
      <v-col cols="12">
        <FormField v-model="dto" :err field="repasswd" />
      </v-col>
      <v-col cols="6">
        <FormField v-model="dto" :err field="email" />
      </v-col>
      <v-col cols="6">
        <FormField v-model="dto" :err field="phone" />
      </v-col>
      <v-col cols="12">
        <FormField v-model="dto" :err field="country" comp="v-select" :items />
      </v-col>
      <v-col cols="12">
        <FormField v-model="dto" :err field="isAgree" comp="v-checkbox" />
      </v-col>

      <v-col cols="12">
        <v-btn :is-loading type="submit">Submit</v-btn>
      </v-col>
      <v-col v-if="err?._errors?.length > 0" cols="12">
        <p>{{ err?._errors }}</p>
      </v-col>
    </v-row>
  </v-form>
</template>

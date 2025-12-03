<script>
// import { mapActions, mapState } from 'vuex'
import FormField from '@/components/FormField.vue'

export default {
  components: { FormField },

  data() {
    return {
      loading: false,
      dto: this.initDto(),
      err: null,
      // err: {
      //   _errors: ['very bad'],
      //   nickname: {
      //     _errors: ['bad'],
      //   },
      //   password: {
      //     _errors: ['bad'],
      //   },
      // },
    }
  },

  computed: {
    // ...mapState('auth', ['err']),
  },

  methods: {
    // ...mapActions('auth', ['signIn']),

    initDto() {
      return {
        nickname: '',
        password: '',
      }
    },

    async handleSubmit() {
      this.loading = true
      // await this.signIn({ ...this.dto })
      this.dto = this.initDto()
      this.loading = false
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
        <v-btn :loading type="submit">Submit</v-btn>
      </v-col>
      <v-col v-if="err?._errors?.length > 0" cols="12">
        <p>{{ err?._errors }}</p>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import FormField from '@/components/FormField.vue'
// import signIn from '../api/rest/auth/signIn.js'

export default {
  components: { FormField },

  emits: ['success'],

  data() {
    return {
      loading: false,
      dto: this.initDto(),
      // err: null,
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
    ...mapState('auth', ['err', 'session']),
  },

  watch: {
    session(newVal) {
      if (newVal && !this.err) this.dto = this.initDto2()
    },
  },

  methods: {
    ...mapActions('auth', ['signIn']),

    initDto() {
      return {
        nickname: 'xxx',
        password: 'xX1!xxxx',
      }
    },
    initDto2() {
      return {
        nickname: '',
        password: '',
      }
    },

    async handleSubmit() {
      this.loading = true
      await this.signIn({ ...this.dto })
      // if (err) {
      //   this.err = err
      // } else {
      //   this.dto = this.initDto2()
      //   this.$emit('success', data.nickname)
      // }
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

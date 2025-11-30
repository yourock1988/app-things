<script>
import { mapActions, mapState } from 'vuex'
import FormField from '../FormField.vue'

export default {
  components: { FormField },

  data() {
    return {
      dto: this.initUser(),
      loading: false,
    }
  },

  computed: {
    ...mapState('users', ['err']),
  },

  methods: {
    ...mapActions('users', ['createUser']),

    initUser() {
      return {
        nickname: '',
        password: '',
        email: '',
      }
    },

    async handleSubmit() {
      this.loading = true
      await this.createUser({ ...this.dto })
      this.dto = this.initUser()
      this.loading = false
    },
  },
}
</script>

<template>
  <v-row class="justify-center">
    <v-col cols="12">
      <v-sheet class="elevation-5 overflow-hidden" border="thin" rounded="xl">
        <v-container>
          <h6 class="text-h6 text-center">Create user</h6>
          <v-form validate-on="submit lazy" @submit.prevent="handleSubmit">
            <v-row class="justify-center">
              <v-col cols="3">
                <FormField v-model="dto" :err field="nickname" />
              </v-col>
              <v-col cols="3">
                <FormField v-model="dto" :err field="password" />
              </v-col>
              <v-col cols="3">
                <FormField v-model="dto" :err field="email" />
              </v-col>

              <v-col cols="3">
                <v-btn :loading type="submit">Submit</v-btn>
              </v-col>
              <v-col v-if="err?._errors.length > 0" cols="12">
                <p>{{ err?._errors }}</p>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-sheet>
    </v-col>
  </v-row>
</template>

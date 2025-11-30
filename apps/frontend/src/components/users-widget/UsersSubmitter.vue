<script>
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      localUser: this.initUser(),
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
      await this.createUser({ ...this.localUser })
      this.localUser = this.initUser()
      this.loading = false
    },
  },
}
</script>

<template>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="12">
        <v-sheet class="elevation-5 overflow-hidden" border="thin" rounded="xl">
          <h6 class="text-h6 text-center">Create user</h6>
          <v-form validate-on="submit lazy" @submit.prevent="handleSubmit">
            <v-container>
              <v-row class="justify-center">
                <v-col cols="3">
                  <v-text-field
                    v-model="localUser.nickname"
                    :error-messages="err?.nickname?._errors"
                    label="nickname"
                    autocomplete="off"
                  />
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="localUser.password"
                    :error-messages="err?.password?._errors"
                    label="password"
                    autocomplete="off"
                  />
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="localUser.email"
                    :error-messages="err?.email?._errors"
                    label="email"
                    autocomplete="off"
                  />
                </v-col>
                <v-col cols="3">
                  <v-btn
                    :loading
                    size="x-large"
                    type="submit"
                    text="Submit"
                    block
                  ></v-btn>
                </v-col>

                <v-col v-if="err?._errors.length > 0" cols="12">
                  <p>{{ err?._errors }}</p>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      dto: this.initDto(),
      isLoading: false,
      err: null,
      // err: {
      //   _errors: ['very bad'],
      //   isConfirmed: {
      //     _errors: ['bad'],
      //   },
      //   city: {
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
        isConfirmed: '',
        nickname: '',
        password: '',
        repasswd: '',
        email: '',
        phone: '',
        city: '',
      }
    },

    async handleSubmit() {
      this.isLoading = true
      await this.signUp({ ...this.dto })
      this.dto = this.initDto()
      this.isLoading = false
    },
  },
}
</script>

<template>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="12" sm="8" md="6" xl="4">
        <v-sheet class="elevation-5 overflow-hidden" border="thin" rounded="xl">
          <h6 class="text-h6 text-center">SIGN UP</h6>
          <v-form validate-on="submit lazy" @submit.prevent="handleSubmit">
            <v-container>
              <v-row class="justify-center">
                <v-col cols="12">
                  <v-text-field
                    v-model="dto.nickname"
                    :error-messages="err?.nickname?._errors"
                    label="nickname"
                    variant="underlined"
                    autocomplete="off"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="dto.password"
                    :error-messages="err?.password?._errors"
                    label="password"
                    variant="underlined"
                    autocomplete="off"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="dto.repasswd"
                    :error-messages="err?.repasswd?._errors"
                    label="repasswd"
                    variant="underlined"
                    autocomplete="off"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="dto.email"
                    :error-messages="err?.email?._errors"
                    label="email"
                    variant="underlined"
                    autocomplete="off"
                  />
                </v-col>

                <v-col cols="12">
                  <v-select
                    v-model="dto.city"
                    :items="['California', 'Florida', 'Texas']"
                    :error-messages="err?.city?._errors"
                    label="city"
                    variant="underlined"
                    autocomplete="off"
                  ></v-select>
                </v-col>

                <v-col cols="12">
                  <v-checkbox
                    v-model="dto.isConfirmed"
                    :error-messages="err?.isConfirmed?._errors"
                    label="isConfirmed"
                    density="compact"
                  ></v-checkbox>
                </v-col>

                <v-col cols="12">
                  <v-btn text="sign up" type="submit" block :is-loading></v-btn>
                </v-col>

                <v-col v-if="err?._errors?.length > 0" cols="12">
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

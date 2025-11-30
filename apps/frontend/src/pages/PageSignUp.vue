<script>
import FormField from '@/components/FormField.vue'
// import { mapActions, mapState } from 'vuex'

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
        isConfirmed: false,
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
      // await this.signUp({ ...this.dto })
      this.dto = this.initDto()
      this.isLoading = false
    },
  },
}
</script>

<template>
  <v-row class="justify-center">
    <v-col cols="12" sm="8" md="6" xl="4">
      <v-sheet border="thin" rounded="xl">
        <v-container>
          <h5 class="text-h5 text-center">SIGN UP</h5>
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
              <v-col cols="12">
                <FormField v-model="dto" :err field="email" />
              </v-col>
              <v-col cols="12">
                <FormField v-model="dto" :err field="phone" />
              </v-col>
              <v-col cols="12">
                <FormField
                  v-model="dto"
                  :err
                  field="city"
                  comp="v-select"
                  :items
                />
              </v-col>

              <v-col cols="12">
                <FormField
                  v-model="dto"
                  :err
                  field="isConfirmed"
                  comp="v-checkbox"
                />
              </v-col>

              <v-col cols="12">
                <v-btn
                  :is-loading
                  size="x-large"
                  type="submit"
                  text="sign up"
                  block
                ></v-btn>
              </v-col>

              <v-col v-if="err?._errors?.length > 0" cols="12">
                <p>{{ err?._errors }}</p>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-sheet>
    </v-col>
  </v-row>
</template>

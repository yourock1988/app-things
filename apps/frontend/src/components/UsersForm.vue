<script>
import { mapActions, mapState } from 'vuex'
import FormField from '../ui/FormField.vue'

export default {
  components: { FormField },
  data() {
    return {
      dto: this.initUser(),
      loading: false,
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
    initUser() {
      return {
        nickname: 'Foobar',
        password: 'qwerty123',
        email: 'foobar@mail.xxx',
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
  <v-form validate-on="submit lazy" @submit.prevent="handleSubmit">
    <v-row class="justify-center">
      <FormField
        v-for="(comp, field) in fields"
        :key="field"
        v-model="dto"
        :field
        :comp
        :cols
        :err
      />

      <v-col cols="3">
        <v-btn :loading type="submit">Submit</v-btn>
      </v-col>
      <v-col v-if="err?._errors.length > 0" cols="12">
        <p>{{ err?._errors }}</p>
      </v-col>
    </v-row>
  </v-form>
</template>

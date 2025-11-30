<script>
import SignInForm from '../components/SignInForm.vue'

export default {
  components: { SignInForm },
}
</script>

<template>
  <v-row class="justify-center">
    <v-col cols="12" sm="8" md="6" xl="4">
      <v-sheet border="thin" rounded="xl">
        <v-container>
          <h5 class="text-h5 text-center">SIGNIN</h5>
          <SignInForm />
        </v-container>
      </v-sheet>
    </v-col>
  </v-row>
</template>

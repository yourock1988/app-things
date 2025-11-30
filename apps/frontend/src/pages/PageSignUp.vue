<script>
import SignUpForm from '../components/SignUpForm.vue'

export default {
  components: { SignUpForm },
}
</script>

<template>
  <v-row class="justify-center">
    <v-col cols="12" sm="8" md="6" xl="4">
      <v-sheet border="thin" rounded="xl">
        <v-container>
          <h5 class="text-h5 text-center">SIGNUP</h5>
          <SignUpForm />
        </v-container>
      </v-sheet>
    </v-col>
  </v-row>
</template>

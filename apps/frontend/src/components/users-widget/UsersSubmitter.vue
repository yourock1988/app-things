<script>
import UsersForm from '../UsersForm.vue'

export default {
  components: { UsersForm },
}
</script>

<template>
  <v-row class="justify-center">
    <v-col cols="12">
      <v-sheet border="thin" rounded="xl">
        <v-container>
          <h5 class="text-h5 text-center">Create user</h5>
          <UsersForm />
        </v-container>
      </v-sheet>
    </v-col>
  </v-row>
</template>

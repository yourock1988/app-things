<script>
import CarsForm from '../CarsForm.vue'

export default {
  components: { CarsForm },
}
</script>

<template>
  <v-row class="justify-center">
    <v-col cols="12">
      <v-sheet border="thin" rounded="xl">
        <v-container>
          <h5 class="text-h5 text-center">Create car</h5>
          <CarsForm />
        </v-container>
      </v-sheet>
    </v-col>
  </v-row>
</template>

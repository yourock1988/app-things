<script>
export default {
  props: ['sizing', 'caption'],
}
</script>

<template>
  <v-row class="justify-center">
    <v-col v-bind="sizing">
      <v-sheet border="thin" rounded="xl">
        <v-container>
          <h5 class="text-h5 text-center">{{ caption }}</h5>
          <slot></slot>
        </v-container>
      </v-sheet>
    </v-col>
  </v-row>
</template>

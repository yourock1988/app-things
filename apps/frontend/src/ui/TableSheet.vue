<script>
export default {
  props: ['struct'],

  computed: {
    keysNames() {
      return Object.keys(this.struct ?? {})
        .map(u => u.toUpperCase())
        .filter(u => u !== 'ERR')
    },
  },
}
</script>

<template>
  <v-container fluid>
    <v-sheet class="elevation-5 overflow-hidden" border="thin" rounded="xl">
      <v-table height="350px" striped="even" fixed-header>
        <thead>
          <tr>
            <th v-for="keyName of keysNames" :key="keyName">{{ keyName }}</th>
            <th class="text-center">ACTIONS</th>
          </tr>
        </thead>
        <transition-group tag="tbody" name="collapse">
          <slot></slot>
        </transition-group>
      </v-table>
    </v-sheet>
  </v-container>
</template>

<style>
.collapse-leave-to {
  transform: translateY(-42px);
  opacity: 0;
}
.collapse-enter-active,
.collapse-leave-active {
  transition:
    opacity 0.15s ease-in,
    transform 0.15s ease-in;
}
</style>

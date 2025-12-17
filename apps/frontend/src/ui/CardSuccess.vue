<script>
export default {
  props: ['title', 'text', 'link', 'ankhor'],
}
</script>

<template>
  <v-card
    color="indigo-darken-3"
    variant="elevated"
    class="my-5 mx-auto"
    max-width="420"
  >
    <v-card-item>
      <div>
        <div class="text-overline mb-1">Успешно!</div>
        <div class="text-h6 mb-1">{{ title }}</div>
        <div class="text-caption">
          <span>{{ text }}&nbsp;</span>
          <slot></slot>
        </div>
      </div>
    </v-card-item>
    <v-card-actions>
      <v-btn color="white" @click="$router.push(link)">{{ ankhor }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

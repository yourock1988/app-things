<script>
import TeapotBox from '../components/TeapotBox.vue'

export default {
  components: { TeapotBox },
}
</script>

<template>
  <div>
    <TeapotBox v-for="id of [4201, 4202, 4203]" :key="id" :teapot-id="id" />
  </div>
</template>

<script>
import imgLogo from '@/assets/img/logo.png'

export default {
  data() {
    return {
      imgLogo,
    }
  },
}
</script>

<template>
  <div class="wrap-logo">
    <span class="logo-small">
      <img :src="imgLogo" width="50px" alt="" />
    </span>
  </div>
</template>

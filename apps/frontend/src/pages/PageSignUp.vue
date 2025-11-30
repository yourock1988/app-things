<script>
import FormSheet from '../components/FormSheet.vue'
import SignUpForm from '../components/SignUpForm.vue'

export default {
  components: { SignUpForm, FormSheet },

  data() {
    return {
      sizing: { cols: 12, sm: 8, md: 6, xl: 4 },
    }
  },
}
</script>

<template>
  <FormSheet caption="Sign-up" :sizing><SignUpForm /></FormSheet>
</template>

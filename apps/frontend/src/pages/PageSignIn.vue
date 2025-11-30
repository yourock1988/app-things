<script>
import FormSheet from '../components/FormSheet.vue'
import SignInForm from '../components/SignInForm.vue'

export default {
  components: { SignInForm, FormSheet },

  data() {
    return {
      sizing: { cols: 12, sm: 8, md: 6, xl: 4 },
    }
  },
}
</script>

<template>
  <FormSheet caption="Sign-in" :sizing><SignInForm /></FormSheet>
</template>

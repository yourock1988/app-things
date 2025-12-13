<script>
import FormSheet from '../../ui/FormSheet.vue'
import UsersForm from '../UsersForm.vue'

export default {
  components: { UsersForm, FormSheet },

  data() {
    return {
      sizing: { cols: 12 },
    }
  },
}
</script>

<template>
  <FormSheet caption="Create car" :sizing><UsersForm /></FormSheet>
</template>

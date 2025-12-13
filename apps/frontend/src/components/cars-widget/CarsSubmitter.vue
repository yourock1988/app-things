<script>
import FormSheet from '../../ui/FormSheet.vue'
import CarsForm from '../CarsForm.vue'

export default {
  components: { CarsForm, FormSheet },

  data() {
    return {
      sizing: { cols: 12 },
    }
  },
}
</script>

<template>
  <FormSheet caption="Create car" :sizing><CarsForm /></FormSheet>
</template>

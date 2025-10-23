<script>
import EditableCellButtons from '../EditableCellButtons.vue'
import EditableCellCheckbox from '../EditableCellCheckbox.vue'
import EditableCellText from '../EditableCellText.vue'

export default {
  components: { EditableCellText, EditableCellCheckbox, EditableCellButtons },

  props: ['user'],
}
</script>

<template>
  <tr>
    <td data-label="id">{{ user.id }}</td>

    <EditableCellText caption="nickname" :user />
    <EditableCellText caption="password" :user />
    <EditableCellText caption="email" :user />
    <EditableCellText caption="money" :user />

    <EditableCellCheckbox caption="isOnline" :user />

    <EditableCellButtons />
  </tr>
</template>

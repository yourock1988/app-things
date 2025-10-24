<script>
import EditableCellButtons from '../EditableCellButtons.vue'
import EditableCellCheckbox from '../EditableCellCheckbox.vue'
import EditableCellText from '../EditableCellText.vue'

export default {
  components: { EditableCellText, EditableCellCheckbox, EditableCellButtons },

  props: ['user'],

  emits: ['user-edited', 'user-deleted-id'],

  data() {
    return {
      localUser: { ...this.user },
    }
  },

  watch: {
    user: {
      deep: true,
      handler(val) {
        this.localUser = { ...val }
      },
    },
  },
}
</script>

<template>
  <tr>
    <td data-label="id">{{ localUser.id }}</td>

    <EditableCellText v-model="localUser.nickname" caption="nickname" />
    <EditableCellText v-model="localUser.password" caption="password" />
    <EditableCellText v-model="localUser.email" caption="email" />
    <EditableCellText v-model.number="localUser.money" caption="money" />

    <EditableCellCheckbox v-model="localUser.isOnline" caption="isOnline" />

    <EditableCellButtons
      @edit="$emit('user-edited', { ...localUser })"
      @delete="$emit('user-deleted-id', localUser.id)"
    />
  </tr>
</template>

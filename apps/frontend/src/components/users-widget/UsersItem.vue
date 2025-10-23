<script>
import EditableCellButtons from '../EditableCellButtons.vue'
import EditableCellCheckbox from '../EditableCellCheckbox.vue'
import EditableCellText from '../EditableCellText.vue'

export default {
  components: { EditableCellText, EditableCellCheckbox, EditableCellButtons },

  props: ['user'],

  emits: ['user-edited'],

  data() {
    return {
      localUser: { ...this.user },
    }
  },

  watch: {
    user(val, oldVal) {
      this.localUser = val
    },
  },

  methods: {
    handleDelete(user) {
      console.log('DELETE', user)
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
    <EditableCellText v-model="localUser.money" caption="money" />

    <EditableCellCheckbox v-model="localUser.isOnline" caption="isOnline" />

    <EditableCellButtons
      @edit="$emit('user-edited', { ...localUser })"
      @delete="handleDelete"
    />
  </tr>
</template>

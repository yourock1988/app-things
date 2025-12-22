<script>
import TurboField from './TurboField.vue'
import TurboBtn from './TurboBtn.vue'

export default {
  components: { TurboBtn, TurboField },
  props: ['entity', 'fields', 'updateById', 'removeById'],
  emits: ['updated', 'deleted'],
  data() {
    return {
      loading: false,
      disabled: false,
      localEntity: { ...this.entity },
      isEditing: false,
      err: null,
    }
  },
  computed: {
    dto() {
      const keys = Object.keys(this.fields)
        .filter(f => f.at(-1) === '$')
        .map(f => f.replace('$', ''))
      return Object.fromEntries(
        Object.entries(this.localEntity).filter(([key]) => keys.includes(key)),
      )
    },
  },
  watch: {
    entity: {
      deep: true,
      handler(val) {
        if (!this.err && !this.isEditing) this.localEntity = { ...val }
      },
    },
  },
  methods: {
    cancel() {
      this.localEntity = { ...this.entity }
      this.isEditing = false
      this.err = null
    },
    async save() {
      // this.isEditing = false
      this.err = null
      this.loading = true
      this.disabled = true
      const [err, data] = await this.updateById(this.entity.id, this.dto)
      this.disabled = false
      this.loading = false
      if (err) {
        this.isEditing = true
        this.err = err
      } else {
        this.$emit('updated', data)
        this.isEditing = false
      }
    },
    async deleted() {
      this.loading = true
      this.disabled = true
      const [err] = await this.removeById(this.entity.id)
      this.disabled = false
      this.loading = false
      if (!err) this.$emit('deleted', this.entity.id)
    },
  },
}
</script>

<template>
  <tr>
    <TurboField
      v-for="(comp, field) in fields"
      :key="field"
      v-model="localEntity"
      :field
      :comp
      :err
      :is-editing
    />

    <td class="d-flex align-center justify-space-around">
      <template v-if="isEditing">
        <TurboBtn :disabled kind="cancel" @click="cancel" />
        <TurboBtn :loading kind="save" @click="save" />
      </template>
      <template v-else>
        <TurboBtn :disabled kind="edit" @click="isEditing = true" />
        <TurboBtn :loading kind="delete" @click="deleted" />
      </template>
    </td>
  </tr>
</template>

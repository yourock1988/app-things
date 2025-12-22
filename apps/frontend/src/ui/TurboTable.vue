<script>
import TableSheet from './TableSheet.vue'
import TurboTr from './TurboTr.vue'

export default {
  components: { TurboTr, TableSheet },
  props: ['modelValue', 'fields', 'getAll', 'updateById', 'removeById'],
  emits: ['update:model-value'],
  data() {
    return {
      err: null,
    }
  },
  watch: {
    modelValue() {
      this.err = null
    },
  },
  async created() {
    const [err, data] = await this.getAll()
    if (err) this.err = err
    else this.$emit('update:model-value', data)
  },
  methods: {
    withUpdated({ id, ...data }) {
      return this.modelValue.map(a => (a.id === id ? { ...a, ...data } : a))
    },
    withoutDeleted(id) {
      return this.modelValue.filter(a => a.id !== id)
    },
  },
}
</script>

<template>
  <TableSheet :struct="err ? { [err._errors[0]]: 'error' } : modelValue[0]">
    <tr v-if="err">
      <td>{{ err._errors[0] }}</td>
    </tr>
    <template v-else>
      <TurboTr
        v-for="entity of modelValue"
        :key="entity.id"
        :entity
        :fields
        :update-by-id
        :remove-by-id
        @updated="$emit('update:model-value', withUpdated($event))"
        @deleted="$emit('update:model-value', withoutDeleted($event))"
      />
    </template>
  </TableSheet>
</template>

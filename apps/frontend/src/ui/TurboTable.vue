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
    withoutDeleted(id) {
      return this.modelValue.filter(a => a.id !== id)
    },
    withUpdated(id, dto) {
      return this.modelValue.map(a => (a.id === id ? { ...a, ...dto } : a))
    },
    async updated({ resolve, id, ...dto }) {
      const [err, data] = await this.updateById(id, dto)
      resolve([err])
      if (!err) this.$emit('update:model-value', this.withUpdated(id, data))
    },
    async deleted({ resolve, id }) {
      const [err] = await this.removeById(id)
      resolve([err])
      if (!err) this.$emit('update:model-value', this.withoutDeleted(id))
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
        v-for="dto of modelValue"
        :key="dto.id"
        :dto
        :fields
        @deleted="deleted"
        @updated="updated"
      />
    </template>
  </TableSheet>
</template>

<script>
import TableSheet from './TableSheet.vue'
import TurboTr from './TurboTr.vue'

export default {
  components: { TurboTr, TableSheet },
  props: ['dtos', 'fields', 'removeById', 'updateById'],
  emits: ['updated'],
  methods: {
    withoutDeleted(id) {
      return this.dtos.filter(a => a.id !== id)
    },
    withUpdated(id, dto) {
      return this.dtos.map(a => (a.id === id ? { ...a, ...dto } : a))
    },
    async updated({ resolve, id, ...dto }) {
      const [err, data] = await this.updateById(id, dto)
      if (err) {
        resolve([err])
      } else {
        this.$emit('updated', this.withUpdated(id, data))
        resolve([null, data])
      }
    },
    async deleted(id) {
      const [err] = await this.removeById(id)
      if (err) {
        this.$emit('updated', this.withUpdated(id, { err }))
        // resolve([err])
      } else {
        this.$emit('updated', this.withoutDeleted(id))
        // resolve([null, data])
      }
    },
  },
}
</script>

<template>
  <TableSheet :struct="dtos[0]">
    <TurboTr
      v-for="dto of dtos"
      :key="dto.id"
      :dto
      :fields
      @deleted="deleted"
      @updated="updated"
    />
  </TableSheet>
</template>

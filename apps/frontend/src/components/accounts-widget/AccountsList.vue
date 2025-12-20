<script>
// import { mapState } from 'vuex'
import { removeById, updateById } from '@/api/rest/accounts.js'
import TurboTr from '../../ui/TurboTr.vue'
import TableSheet from '../../ui/TableSheet.vue'

export default {
  components: { TurboTr, TableSheet },
  props: ['accounts'],
  emits: ['updated'],
  data() {
    return {
      fields: {
        id: null,
        nickname$: null,
        password$: null,
        email$: null,
        phone$: null,
        country$: null,
        isAgree$: 'v-checkbox',
        role$: null,
        isLoggedIn$: 'v-checkbox',
        updatedAt$: { type: 'number' },
        createdAt: { type: 'number' },
      },
    }
  },
  methods: {
    withoutDeleted(id) {
      return this.accounts.filter(a => a.id !== id)
    },
    withUpdated(id, dto) {
      return this.accounts.map(a => (a.id === id ? { ...a, ...dto } : a))
    },
    async updated({ resolve, id, ...dto }) {
      const [err, data] = await updateById(id, dto)
      if (err) {
        resolve([err])
      } else {
        this.$emit('updated', this.withUpdated(id, data))
        resolve([null, data])
      }
    },
    async deleted(id) {
      const [err] = await removeById(id)
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
  <TableSheet :struct="accounts[0]">
    <TurboTr
      v-for="dto of accounts"
      :key="dto.id"
      :dto
      :fields
      @deleted="deleted"
      @updated="updated"
    />
  </TableSheet>
</template>

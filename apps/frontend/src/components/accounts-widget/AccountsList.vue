<script>
// import { mapState } from 'vuex'
import { removeById, updateById } from '@/api/rest/accounts.js'
import AccountsItem from './AccountsItem.vue'
import TableSheet from '../../ui/TableSheet.vue'

export default {
  components: { AccountsItem, TableSheet },
  props: ['accounts'],
  emits: ['updated'],
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
        this.$emit('updated', this.withUpdated(id, { err }))
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
    <AccountsItem
      v-for="account of accounts"
      :key="account.id"
      :account
      @deleted="deleted"
      @updated="updated"
    />
  </TableSheet>
</template>

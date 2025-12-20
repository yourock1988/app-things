<script>
// import AccountsSubmitter from '@/components/accounts-widget/AccountsSubmitter.vue'
import { getAll, removeById, updateById } from '@/api/rest/accounts.js'
import TurboTable from '@/ui/TurboTable.vue'

export default {
  components: { TurboTable },
  data() {
    return {
      accounts: [],
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
    getAll,
    updateById,
    removeById,
  },
}
</script>

<template>
  <div>
    <h3>PAGE ACCOUNTS</h3>
    <h4>{{ accounts }}</h4>
    <div>
      <!-- <AccountsSubmitter /> -->
      <TurboTable
        v-model="accounts"
        :fields
        :get-all
        :update-by-id
        :remove-by-id
      />
    </div>
  </div>
</template>

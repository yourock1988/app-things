<script>
// import AccountsSubmitter from '@/components/accounts-widget/AccountsSubmitter.vue'
import { getAll, removeById, updateById } from '@/api/rest/accounts.js'
import TurboTable from '@/ui/TurboTable.vue'

export default {
  components: { TurboTable },
  data() {
    return {
      accounts: [],
      err: null,
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
  async created() {
    const [err, data] = await getAll()
    if (err) {
      this.err = err
    } else {
      this.accounts = data
    }
  },
  methods: {
    removeById,
    updateById,
  },
}
</script>

<template>
  <div>
    <h3>PAGE ACCOUNTS</h3>
    <h4>{{ accounts }}</h4>
    <div>
      <!-- <AccountsSubmitter /> -->
      <div v-if="err">
        <h5>{{ err }}</h5>
      </div>
      <TurboTable
        v-else
        :dtos="accounts"
        :fields
        :update-by-id
        :remove-by-id
        @updated="accounts = $event"
      />
    </div>
  </div>
</template>

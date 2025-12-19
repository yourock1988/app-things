<script>
import AccountsSubmitter from '@/components/accounts-widget/AccountsSubmitter.vue'
import AccountsList from '@/components/accounts-widget/AccountsList.vue'
import { getAll } from '@/api/rest/accounts.js'

export default {
  components: { AccountsSubmitter, AccountsList },

  data() {
    return {
      accounts: [],
      err: null,
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
      <AccountsList v-else :accounts />
    </div>
  </div>
</template>

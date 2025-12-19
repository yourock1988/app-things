<script>
// import { mapActions } from 'vuex'
import TurboTd from '../../ui/TurboTd.vue'
import TurboBtn from '../../ui/TurboBtn.vue'

export default {
  components: { TurboTd, TurboBtn },
  props: ['account'],
  emits: ['updated', 'deleted'],
  data() {
    return {
      localAccount: this.parseAccount(this.account),
      isEditing: false,
    }
  },
  computed: {
    err() {
      return this.account.err ?? null
    },
  },
  watch: {
    account: {
      deep: true,
      handler(val) {
        if (val.err || this.isEditing) return
        this.localAccount = this.parseAccount(val)
      },
    },
  },
  methods: {
    parseAccount(account) {
      const { price, engine, hasTurbo, hp } = account
      return { price, engine, hasTurbo, hp }
    },
    async save() {
      const { promise, resolve } = Promise.withResolvers()
      this.isEditing = false
      this.$emit('updated', {
        id: this.account.id,
        dto: { ...this.localAccount },
        resolve,
      })
      const [err] = await promise
      if (err) this.isEditing = true
      // if (this.account.err) this.isEditing = true
    },
    cancel() {
      this.localAccount = this.parseAccount(this.account)
      this.isEditing = false
    },
  },
}
</script>

<template>
  <tr>
    <TurboTd :model-value="account" field="id" />
    <TurboTd :model-value="account" field="nickname" />
    <TurboTd :model-value="account" field="password" />
    <TurboTd :model-value="account" field="email" />
    <TurboTd :model-value="account" field="phone" />
    <TurboTd :model-value="account" field="country" />
    <TurboTd :model-value="account" field="isAgree" />
    <TurboTd :model-value="account" field="role" />
    <TurboTd :model-value="account" field="isLoggedIn" />
    <TurboTd :model-value="account" field="favoriteNumbers" />
    <TurboTd :model-value="account" field="authorizationsCount" />
    <TurboTd :model-value="account" field="authenticationsCount" />
    <TurboTd :model-value="account" field="createdAt" />
    <TurboTd :model-value="account" field="updatedAt" />

    <!-- <TurboTd v-model.number="localAccount" field="price" :err :is-editing />
    <TurboTd v-model="localAccount" field="engine" :err :is-editing />
    <TurboTd :model-value="account" field="hasTurbo" />
    <TurboTd v-model.number="localAccount" field="hp" :err :is-editing />
    <TurboTd :model-value="account" field="isRunning" /> -->

    <td class="d-flex align-center justify-space-around">
      <template v-if="isEditing">
        <TurboBtn kind="cancel" @click="cancel" />
        <TurboBtn kind="save" @click="save" />
      </template>
      <template v-else>
        <TurboBtn kind="edit" @click="isEditing = true" />
        <TurboBtn kind="delete" @click="$emit('deleted', account.id)" />
      </template>
    </td>
  </tr>
</template>

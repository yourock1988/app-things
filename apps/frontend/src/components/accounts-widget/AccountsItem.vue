<script>
// import { mapActions } from 'vuex'
import TurboTdNew from '../../ui/TurboTdNew.vue'
import TurboBtn from '../../ui/TurboBtn.vue'

export default {
  components: { TurboTdNew, TurboBtn },
  props: ['account'],
  emits: ['updated', 'deleted'],
  data() {
    return {
      localAccount: { ...this.account },
      isEditing: false,
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
  watch: {
    account: {
      deep: true,
      handler(val) {
        if (!val.err && !this.isEditing) this.localAccount = { ...val }
      },
    },
  },
  methods: {
    parsedAccount() {
      const {
        nickname,
        password,
        email,
        phone,
        country,
        isAgree,
        role,
        isLoggedIn,
        updatedAt,
      } = this.localAccount
      return {
        nickname,
        password,
        email,
        phone,
        country,
        isAgree,
        role,
        isLoggedIn,
        updatedAt,
      }
    },
    async save() {
      const { promise, resolve } = Promise.withResolvers()
      this.isEditing = false
      this.$emit('updated', {
        resolve,
        id: this.account.id,
        ...this.parsedAccount(),
      })
      const [err] = await promise
      if (err) this.isEditing = true
      // if (this.account.err) this.isEditing = true
    },
    cancel() {
      this.localAccount = { ...this.account }
      this.isEditing = false
    },
  },
}
// сделать автоматический парсинг редактируемых полей
// попробовать сделать локальный err
</script>

<template>
  <tr>
    <TurboTdNew
      v-for="(comp, field) in fields"
      :key="field"
      v-model="localAccount"
      :field
      :comp
      :err="account.err"
      :is-editing
    />

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

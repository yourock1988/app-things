<script>
import { add, getAll, removeById, updateById } from '@/api/rest/accounts.js'
import TurboForm from '@/ui/TurboForm.vue'
import TurboTable from '@/ui/TurboTable.vue'
import FormSheet from '@/ui/FormSheet.vue'

export default {
  components: { TurboTable, FormSheet, TurboForm },
  data() {
    return {
      cols: 3,
      sizing: { cols: 12 },
      accounts: [],
      fields: {
        id: null,
        nickname$: null,
        password$: null,
        email$: null,
        phone$: null,
        country$: {
          component: 'v-select',
          list: ['California', 'Florida', 'Texas'],
        },
        isAgree$: 'v-checkbox',
        role$: null,
        isLoggedIn$: 'v-checkbox',
        updatedAt$: { type: 'number' },
        createdAt: { type: 'number' },
      },
      fieldsForm: {
        nickname: null,
        password: null,
        repasswd: null,
        email: null,
        phone: null,
        country: {
          component: 'v-select',
          list: ['California', 'Florida', 'Texas'],
        },
        isAgree: 'v-checkbox',
      },
    }
  },
  methods: {
    add,
    getAll,
    updateById,
    removeById,
    initTest() {
      return {
        nickname: 'Muscle',
        password: 'Bugatti!1',
        repasswd: 'Bugatti!1',
        email: 'qqq@qq.qq',
        phone: '+380991112233',
        country: 'Trueland',
        isAgree: true,
      }
    },
  },
}
</script>

<template>
  <div>
    <h3>PAGE ACCOUNTS</h3>

    <FormSheet caption="Create account" :sizing>
      <TurboForm
        :add
        :cols
        :fields="fieldsForm"
        :init-test
        @submitted="accounts.push($event)"
      />
    </FormSheet>

    <TurboTable
      v-model="accounts"
      :fields
      :get-all
      :update-by-id
      :remove-by-id
    />
  </div>
</template>

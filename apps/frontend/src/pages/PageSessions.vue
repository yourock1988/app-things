<script>
import { add, getAll, removeById, updateById } from '@/api/rest/sessions.js'
import TurboTable from '@/ui/TurboTable.vue'
import TurboForm from '@/ui/TurboForm.vue'
import FormSheet from '@/ui/FormSheet.vue'

export default {
  components: { TurboTable, TurboForm, FormSheet },
  data() {
    return {
      cols: 3,
      sizing: { cols: 12 },
      sessions: [],
      fields: {
        id: null,
        sessionId: null,
        nickname$: null,
        createdAt: { type: 'number' },
        updatedAt: { type: 'number' },
      },
      fieldsForm: {
        nickname: null,
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
        nickname: 'Killer8',
      }
    },
  },
}
</script>

<template>
  <div>
    <h3>PAGE SESSIONS</h3>

    <FormSheet caption="Create session" :sizing>
      <TurboForm
        :add
        :cols
        :fields="fieldsForm"
        :init-test
        @submitted="sessions.push($event)"
      />
    </FormSheet>

    <TurboTable
      v-model="sessions"
      :fields
      :get-all
      :update-by-id
      :remove-by-id
    />
  </div>
</template>

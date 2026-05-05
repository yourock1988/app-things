<script>
import { add, getAll, removeById, updateById } from '@/api/io/personsApiIo.js'
import TurboTable from '@/ui/TurboTable.vue'
import TurboForm from '@/ui/TurboForm.vue'
import FormSheet from '@/ui/FormSheet.vue'
import { mapMutations } from 'vuex'

export default {
  components: { TurboTable, TurboForm, FormSheet },
  data() {
    return {
      cols: 3,
      sizing: { cols: 12 },
      fields: {
        id: null,
        nickname: null,
        password$: null,
        email: null,
        money$: { type: 'number' },
        isOnline: 'v-checkbox',
      },
      fieldsForm: {
        nickname: null,
        password: null,
        email: null,
      },
    }
  },
  computed: {
    persons: {
      get() {
        return this.$store.state.personsStore.persons
      },
      set(val) {
        this.SET_PERSONS(val)
      },
    },
  },
  methods: {
    ...mapMutations('personsStore', [
      // eslint-disable-next-line vue/no-unused-properties
      'SET_PERSONS',
      'ADD_PERSON',
    ]),
    add,
    getAll,
    removeById,
    updateById,
    initTest() {
      return {
        nickname: 'Foobar',
        password: 'qwerty123',
        email: 'foobar@mail.xxx',
      }
    },
  },
}
</script>

<template>
  <div>
    <h3>PAGE PERSONS</h3>
    <FormSheet caption="Create person" :sizing>
      <TurboForm
        :add
        :cols
        :fields="fieldsForm"
        :init-test
        @submitted="ADD_PERSON($event)"
      />
    </FormSheet>
    <TurboTable
      v-model="persons"
      :fields
      :get-all
      :update-by-id
      :remove-by-id
    />
  </div>
</template>

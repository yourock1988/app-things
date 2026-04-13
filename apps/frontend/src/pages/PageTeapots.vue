<script>
import { add, getAll, removeById, updateById } from '@/api/io/teapotsApiIo.js'
import TurboTable from '@/ui/TurboTable.vue'
import TurboForm from '@/ui/TurboForm.vue'
import FormSheet from '@/ui/FormSheet.vue'
import { mapMutations } from 'vuex'

export default {
  components: { TurboTable, TurboForm, FormSheet },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.SUBSCRIBE()
    })
  },
  beforeRouteLeave(to, from, next) {
    this.SET_TEAPOTS([])
    this.UNSUBSCRIBE()
    next()
  },
  data() {
    return {
      cols: 3,
      sizing: { cols: 12 },
      fields: {
        id: null,
        temperature$: { type: 'number' },
        ongoing: null,
      },
      fieldsForm: {
        temperature: { type: 'number' },
        // ongoing: {
        //   component: 'v-select',
        //   list: ['idle', 'boiling'],
        // },
      },
    }
  },
  computed: {
    teapots: {
      get() {
        return this.$store.state.teapotsStore.teapots
      },
      set(val) {
        this.SET_TEAPOTS(val)
      },
    },
  },
  methods: {
    ...mapMutations('teapotsStore', [
      // eslint-disable-next-line vue/no-unused-properties
      'SUBSCRIBE',
      'UNSUBSCRIBE',
      'SET_TEAPOTS',
      'ADD_TEAPOT',
    ]),
    add,
    getAll,
    removeById,
    updateById,
    initTest() {
      return {
        temperature: 9,
      }
    },
  },
}
</script>

<template>
  <div>
    <h3>PAGE TEAPOTS</h3>
    <FormSheet caption="Create teapot" :sizing>
      <TurboForm
        :add
        :cols
        :fields="fieldsForm"
        :init-test
        @submitted="ADD_TEAPOT($event)"
      />
    </FormSheet>
    <TurboTable
      v-model="teapots"
      :fields
      :get-all
      :update-by-id
      :remove-by-id
    />
  </div>
</template>

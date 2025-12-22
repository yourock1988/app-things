<script>
import { add, getAll, removeById, updateById } from '@/api/ws/users.js'
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
    this.SET_USERS([])
    this.UNSUBSCRIBE()
    next()
  },
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
    users: {
      get() {
        return this.$store.state.users.users
      },
      set(val) {
        this.SET_USERS(val)
      },
    },
  },
  methods: {
    ...mapMutations('users', [
      // eslint-disable-next-line vue/no-unused-properties
      'SUBSCRIBE',
      'UNSUBSCRIBE',
      'SET_USERS',
      'ADD_USER',
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
    <h3>PAGE USERS</h3>
    <FormSheet caption="Create user" :sizing>
      <TurboForm
        :add
        :cols
        :fields="fieldsForm"
        :init-test
        @submitted="ADD_USER($event)"
      />
    </FormSheet>
    <TurboTable v-model="users" :fields :get-all :update-by-id :remove-by-id />
  </div>
</template>

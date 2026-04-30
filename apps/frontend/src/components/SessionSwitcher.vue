<script>
import { mapMutations, mapState } from 'vuex'
import { getAll } from '@/api/rest/sessionsApiRest'
import { ioNamespaces } from '@/utils/IoNamespaces.js'

export default {
  data() {
    return {
      selectedSessId: '',
      sessions: [],
    }
  },
  computed: {
    ...mapState('authStore', ['session']),
    sessIds() {
      return this.sessions?.map(d => d.sessionId) ?? []
    },
  },
  watch: {
    sessIds(val) {
      ;[this.selectedSessId] = val
    },
    selectedSessId(val) {
      const session = this.sessions.find(s => s.sessionId === val)
      this.SET_SESSION(session)
      ioNamespaces.switchSession(val)
      ioNamespaces.restart()
    },
  },
  async created() {
    const [err, data] = await getAll()
    if (err) return
    this.sessions = data
  },
  methods: {
    ...mapMutations('authStore', ['SET_SESSION']),
  },
}
</script>

<template>
  <div class="d-flex align-center">
    <b style="cursor: pointer"
      ><i
        ><u>{{ session?.nickname }}</u></i
      ></b
    >
    &nbsp; &nbsp;
    <v-select
      v-model="selectedSessId"
      :items="sessIds"
      density="compact"
      label="Compact"
      class="d-flex align-center"
    ></v-select>
  </div>
</template>

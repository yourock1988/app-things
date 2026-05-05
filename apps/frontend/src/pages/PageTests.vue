<script>
import { mapState, mapActions } from 'vuex'
import TurboBtn from '@/ui/TurboBtn.vue'

export default {
  components: { TurboBtn },

  computed: {
    ...mapState('personsStore', ['err']),
  },

  methods: {
    ...mapActions('persons', [
      'createPerson',
      'deletePersonById',
      'updatePersonById',
      'readPersonById',
    ]),
  },
}
</script>

<template>
  <div>
    <h3>PAGE TESTS</h3>

    <TurboBtn kind="cancel" />
    <TurboBtn kind="save" />
    <TurboBtn kind="edit" />
    <TurboBtn kind="delete" />

    <div>{{ err }}</div>

    <button @click="deletePersonById(42)">WTF DELETE</button>

    <button
      @click="
        updatePersonById({ id: 111, person: { money: 0, password: 'xxxx' } })
      "
    >
      WTF UPDATE 0
    </button>

    <button @click="updatePersonById({ id: 42, person: {} })">
      WTF UPDATE 1
    </button>

    <button
      @click="
        updatePersonById({ id: 42, person: { money: 0, password: 'xxxx' } })
      "
    >
      WTF UPDATE 2
    </button>

    <button
      @click="
        updatePersonById({ id: 42, person: { money: 0, password: 'xxxxx' } })
      "
    >
      WTF UPDATE 3
    </button>

    <button
      @click="
        createPerson({
          nickname: 'nicknameSchema',
          password: 'passwordSchema',
          email: 'emailSchema',
        })
      "
    >
      WTF CREATE
    </button>

    <button @click="readPersonById(42)">WTF GET</button>
  </div>
</template>

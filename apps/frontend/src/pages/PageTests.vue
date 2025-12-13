<script>
import { mapState, mapActions } from 'vuex'
import TurboBtn from '../ui/TurboBtn.vue'

export default {
  components: { TurboBtn },

  computed: {
    ...mapState('users', ['err']),
  },

  methods: {
    ...mapActions('users', [
      'createUser',
      'deleteUserById',
      'updateUserById',
      'readUserById',
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

    <button @click="deleteUserById(42)">WTF DELETE</button>

    <button
      @click="updateUserById({ id: 111, user: { money: 0, password: 'xxxx' } })"
    >
      WTF UPDATE 0
    </button>

    <button @click="updateUserById({ id: 42, user: {} })">WTF UPDATE 1</button>

    <button
      @click="updateUserById({ id: 42, user: { money: 0, password: 'xxxx' } })"
    >
      WTF UPDATE 2
    </button>

    <button
      @click="updateUserById({ id: 42, user: { money: 0, password: 'xxxxx' } })"
    >
      WTF UPDATE 3
    </button>

    <button
      @click="
        createUser({
          nickname: 'nicknameSchema',
          password: 'passwordSchema',
          email: 'emailSchema',
        })
      "
    >
      WTF CREATE
    </button>

    <button @click="readUserById(42)">WTF GET</button>
  </div>
</template>

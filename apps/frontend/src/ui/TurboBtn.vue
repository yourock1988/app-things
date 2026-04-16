<script>
export default {
  props: ['kind'],

  data() {
    return {
      kinds: {
        cancel: {
          text: 'Cancel',
          color: 'warning',
          prependIcon: 'mdi-cancel',
        },
        save: {
          text: 'Save',
          color: 'secondary',
          prependIcon: 'mdi-content-save-edit',
        },
        edit: {
          text: 'Edit',
          color: 'primary',
          prependIcon: 'mdi-pencil',
        },
        delete: {
          text: 'Delete',
          color: 'error',
          prependIcon: 'mdi-delete-forever',
        },
        join: {
          text: 'Join',
          color: 'green',
          prependIcon: 'mdi-login',
        },
        leave: {
          text: 'Leave',
          color: 'red',
          prependIcon: 'mdi-logout',
        },
      },
    }
  },

  computed: {},
}
</script>

<template>
  <v-btn size="small" v-bind="kinds[kind]"></v-btn>
</template>

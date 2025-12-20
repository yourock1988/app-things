<script>
import TurboTdNew from './TurboTdNew.vue'
import TurboBtn from './TurboBtn.vue'

export default {
  components: { TurboTdNew, TurboBtn },
  props: ['entity', 'fields'],
  emits: ['updated', 'deleted'],
  data() {
    return {
      localEntity: { ...this.entity },
      isEditing: false,
      err: null,
    }
  },
  computed: {
    dto() {
      const keys = Object.keys(this.fields)
        .filter(f => f.at(-1) === '$')
        .map(f => f.replace('$', ''))
      return Object.fromEntries(
        Object.entries(this.localEntity).filter(([key]) => keys.includes(key)),
      )
    },
  },
  watch: {
    entity: {
      deep: true,
      handler(val) {
        if (!this.err && !this.isEditing) this.localEntity = { ...val }
      },
    },
  },
  methods: {
    async save() {
      const { promise, resolve } = Promise.withResolvers()
      this.isEditing = false
      this.err = null
      this.$emit('updated', {
        resolve,
        id: this.entity.id,
        ...this.dto,
      })
      const [err] = await promise
      if (err) {
        this.isEditing = true
        this.err = err
      }
    },
    cancel() {
      this.localEntity = { ...this.entity }
      this.isEditing = false
      this.err = null
    },
    async deleted() {
      const { promise, resolve } = Promise.withResolvers()
      this.$emit('deleted', { resolve, id: this.entity.id })
      const [err] = await promise
      if (err) this.err = err
    },
  },
}
</script>

<template>
  <tr>
    <TurboTdNew
      v-for="(comp, field) in fields"
      :key="field"
      v-model="localEntity"
      :field
      :comp
      :err
      :is-editing
    />

    <td class="d-flex align-center justify-space-around">
      <template v-if="isEditing">
        <TurboBtn kind="cancel" @click="cancel" />
        <TurboBtn kind="save" @click="save" />
      </template>
      <template v-else>
        <TurboBtn kind="edit" @click="isEditing = true" />
        <TurboBtn kind="delete" @click="deleted" />
      </template>
    </td>
  </tr>
</template>

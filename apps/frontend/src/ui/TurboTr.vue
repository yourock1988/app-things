<script>
import TurboTdNew from './TurboTdNew.vue'
import TurboBtn from './TurboBtn.vue'

export default {
  components: { TurboTdNew, TurboBtn },
  props: ['entity', 'fields', 'updateById', 'removeById'],
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
      this.isEditing = false
      this.err = null
      const [err, data] = await this.updateById(this.entity.id, this.dto)
      if (err) {
        this.isEditing = true
        this.err = err
      } else {
        this.$emit('updated', data)
      }
    },
    cancel() {
      this.localEntity = { ...this.entity }
      this.isEditing = false
      this.err = null
    },
    async deleted() {
      const [err] = await this.removeById(this.entity.id)
      if (!err) this.$emit('deleted', this.entity.id)
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

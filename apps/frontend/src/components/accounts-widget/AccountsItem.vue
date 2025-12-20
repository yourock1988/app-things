<script>
import TurboTdNew from '../../ui/TurboTdNew.vue'
import TurboBtn from '../../ui/TurboBtn.vue'

function extractEditableProps(fields, dto) {
  const editableKeys = Object.keys(fields)
    .filter(f => f.at(-1) === '$')
    .map(f => f.replace('$', ''))
  return Object.fromEntries(
    Object.entries(dto).filter(([key]) => editableKeys.includes(key)),
  )
}

export default {
  components: { TurboTdNew, TurboBtn },
  props: ['dto', 'fields'],
  emits: ['updated', 'deleted'],
  data() {
    return {
      localDto: { ...this.dto },
      isEditing: false,
      err: null,
    }
  },
  watch: {
    dto: {
      deep: true,
      handler(val) {
        if (!this.err && !this.isEditing) this.localDto = { ...val }
      },
    },
  },
  methods: {
    async save() {
      const { promise, resolve } = Promise.withResolvers()
      this.isEditing = false
      this.$emit('updated', {
        resolve,
        id: this.dto.id,
        ...extractEditableProps(this.fields, this.localDto),
      })
      const [err] = await promise
      if (err) {
        this.err = err
        this.isEditing = true
      }
    },
    cancel() {
      this.localDto = { ...this.dto }
      this.isEditing = false
    },
  },
}
</script>

<template>
  <tr>
    <TurboTdNew
      v-for="(comp, field) in fields"
      :key="field"
      v-model="localDto"
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
        <TurboBtn kind="delete" @click="$emit('deleted', dto.id)" />
      </template>
    </td>
  </tr>
</template>

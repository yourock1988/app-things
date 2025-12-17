<script>
import FormField from '../ui/FormField.vue'

export default {
  components: { FormField },
  // initTest временно для тестирования. его можно легко снести нафиг
  // и поставить абстрактный initDto()
  props: ['fields', 'err', 'cols', 'initTest'],
  emits: ['submit'],
  data() {
    return {
      loading: false,
      dto: this.initTest(),
      // dto: this.initDto(),
    }
  },
  methods: {
    // initDto() {
    //   return Object.fromEntries(
    //     Object.keys(this.fields).map(f => [f, undefined]),
    //   )
    // },
    async handleSubmit() {
      const { promise, resolve } = Promise.withResolvers()
      this.loading = true
      this.$emit('submit', { ...this.dto, resolve })
      await promise
      this.loading = false
      if (!this.err) this.dto = this.initTest()
      // if (!this.err) this.dto = this.initDto()
    },
  },
}
</script>

<template>
  <v-form validate-on="submit lazy" @submit.prevent="handleSubmit">
    <v-row class="justify-center">
      <FormField
        v-for="(comp, field) in fields"
        :key="field"
        v-model="dto"
        :field
        :comp
        :cols
        :err
      />

      <v-col :cols>
        <v-btn :loading type="submit">Submit</v-btn>
      </v-col>
      <v-col v-if="err?._errors.length > 0" cols="12">
        <p>{{ err?._errors }}</p>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import FormField from './FormField.vue'

export default {
  components: { FormField },
  // initTest временно для тестирования. его можно легко снести нафиг
  // и поставить абстрактный initDto()
  props: ['fields', 'cols', 'add', 'initTest'],
  emits: ['submitted'],
  data() {
    return {
      loading: false,
      dto: this.initTest(),
      err: null,
      // dto: this.initDto(),
    }
  },
  methods: {
    // initDto() {
    //   return Object.fromEntries(
    //     Object.keys(this.fields).map(f => [f, undefined]),
    //   )
    // },
    async submit() {
      this.loading = true
      const [err, data] = await this.add({ ...this.dto })
      this.loading = false
      if (err) {
        this.err = err
      } else {
        this.$emit('submitted', { ...data })
        this.dto = this.initTest()
        this.err = null
      }
    },
  },
}
</script>

<template>
  <v-form validate-on="submit lazy" @submit.prevent="submit">
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

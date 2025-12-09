<script>
import { mapState } from 'vuex/dist/vuex.cjs.js'
import FormSheet from '../components/FormSheet.vue'
import SignInForm from '../components/SignInForm.vue'

export default {
  components: { SignInForm, FormSheet },

  data() {
    return {
      sizing: { cols: 12, sm: 8, md: 6, xl: 4 },
    }
  },

  computed: {
    ...mapState('auth', ['session']),
  },
}
</script>

<template>
  <FormSheet caption="Sign-in" :sizing>
    <v-card
      v-if="session"
      color="indigo-darken-3"
      variant="elevated"
      class="my-5 mx-auto"
      max-width="420"
    >
      <v-card-item>
        <div>
          <div class="text-overline mb-1">Успешно!</div>
          <div class="text-h6 mb-1">Вы вошли в систему!</div>
          <div class="text-caption">
            <span> Теперь можете юзать приложение под ником </span>
            <b style="cursor: pointer">
              <i>
                <u>{{ session.nickname }}</u>
              </i>
            </b>
          </div>
        </div>
      </v-card-item>
      <v-card-actions>
        <v-btn color="white" @click="$router.push('/cars')">Юзать</v-btn>
      </v-card-actions>
    </v-card>
    <SignInForm v-else />
  </FormSheet>
</template>

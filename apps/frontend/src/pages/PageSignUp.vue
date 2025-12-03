<script>
import FormSheet from '../components/FormSheet.vue'
import SignUpForm from '../components/SignUpForm.vue'

export default {
  components: { SignUpForm, FormSheet },

  data() {
    return {
      sizing: { cols: 12, sm: 8, md: 6, xl: 4 },
      isSubmitted: false,
    }
  },
}
</script>

<template>
  <FormSheet caption="Sign-up" :sizing>
    <v-card
      v-if="isSubmitted"
      color="indigo-darken-3"
      variant="elevated"
      class="my-5 mx-auto"
      max-width="420"
    >
      <v-card-item>
        <div>
          <div class="text-overline mb-1">Успешно!</div>
          <div class="text-h6 mb-1">Вы зарегистрированы!</div>
          <div class="text-caption">
            Теперь можете войти, используя ваш логин и пароль
          </div>
        </div>
      </v-card-item>
      <v-card-actions>
        <v-btn color="white" @click="$router.push('/sign-in')">Войти</v-btn>
      </v-card-actions>
    </v-card>
    <SignUpForm v-else @success="isSubmitted = true" />
  </FormSheet>
</template>

// import { defineConfig } from 'eslint/config'
// import pluginVue from 'eslint-plugin-vue'
// import globals from 'globals'
// import js from '@eslint/js'

// import antfu from '@antfu/eslint-config'

// export default antfu({
//   // Он сам включит правила для JS и Vue автоматичеки
//   vue: true,

//   // А тут ты просто точечно отключаешь то, что бесит
//   rules: {
//     'vue/multi-word-component-names': 'off',
//   },
// })

// export default defineConfig([
//   // add more generic rulesets here, such as:

//   js.configs.recommended,

//   ...pluginVue.configs['flat/recommended'],

//   {
//     rules: {
//       'no-var': 'error',
//       // override/add rules settings here, such as:
//       // 'vue/no-unused-vars': 'error'
//     },
//     languageOptions: {
//       sourceType: 'module',
//       globals: {
//         ...globals.browser,
//       },
//     },
//   },
// ])

// console.dir(js.configs.recommended.rules)
// console.dir(pluginVue.configs['flat/recommended'][1].languageOptions)

import Vue from 'vue'
import {
  ValidationProvider,
  extend,
  localize
} from 'vee-validate'
import {
  required,
  email
} from 'vee-validate/dist/rules'

localize('pt_BR', {
  messages: {
    // your messages.
  }
})

// Add the required rule
extend('required', {
  ...required,
  message: (field) => `Campo ${field} é obrigatório`
})

// Add the email rule
extend('email', {
  ...email,
  message: 'E-mail inválido'
})

// Add a rule.
extend('secret', {
  validate: value => value === 'example',
  message: 'This is not the magic word'
})

// Register it globally
Vue.component('ValidationProvider', ValidationProvider)

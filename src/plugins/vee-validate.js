import Vue from 'vue'
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  localize
} from 'vee-validate'
import {
  required,
  email
} from 'vee-validate/dist/rules'

const moment = require('moment')

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
extend('password_confirm', {
  params: ['password'], // list of parameter names
  validate (value, {
    password
  }) {
    return value === password
  },
  message: 'As senhas não conferem'
})

extend('required_input_group', {
  validate (value) {
    return value.length
  },
  message: 'Você deve escolher uma opção'
})

extend('date_format', {
  validate (value) {
    return moment(value, 'DD/MM/YYYY', true).isValid()
  },
  message: 'Data inválida'
})

extend('people_name', {
  validate (value) {
    return !(/\d/.test(value))
  },
  message: 'Nome inválido'
})

// Register it globally
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

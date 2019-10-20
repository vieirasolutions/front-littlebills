import Vue from 'vue'

Vue.filter('currencyBr', function (value) {
  return (!Number(value)) ? value : Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })
})

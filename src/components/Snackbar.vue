<template>
  <v-snackbar
    v-model="snackbar"
    :color="color"
    right
    :timeout="timeout"
    top
  >
    {{ text }}
    <v-btn
      dark
      text
      @click="snackbar = false"
    >
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  data: () => ({
  }),
  computed: {
    snackbar: {
      get () {
        return this.$store.state.snackbar.snackbar
      },
      set (value) {
        this.$store.dispatch('snackbar/defineSnackbar', value)
      }
    },
    text: function () {
      return this.$store.getters['snackbar/getText']
    },
    color: function () {
      return this.$store.getters['snackbar/getColor']
    },
    timeout: function () {
      return this.$store.getters['snackbar/getTimeout']
    }
  }
}
</script>

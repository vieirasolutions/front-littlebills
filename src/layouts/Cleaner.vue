<template>
  <v-app>
    <router-view></router-view>
    <Snackbar />
  </v-app>
</template>

<script>
export default {
  components: {
    Snackbar: () => import('@/components/Snackbar.vue')
  }
}
</script>

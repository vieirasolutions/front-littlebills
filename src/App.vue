<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
const defaultLayout = 'default'

export default {
  name: 'App',
  data: () => ({
    //
  }),
  computed: {
    layout () {
      return (this.$route.meta.layout || defaultLayout) + '-layout'
    }
  }
}
</script>

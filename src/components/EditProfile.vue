<template>
  <v-dialog
    v-model="dialog"
    max-width="800px"
    :persistent="true"
  >
    <v-card>
      <v-card-title><span class="headline">Editar perfil</span></v-card-title>
      <v-divider class="mt-0 mb-2"></v-divider>
      <v-card-text class="pl-0 pb-0">
        <v-container class="pl-0 pr-0 pt-2 pb-0">
          <v-list-item avatar>
            <v-list-item-avatar color="black">
              <img
                :src="avatar"
                alt="avatar"
              >
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ nome }}</v-list-item-title>
              <v-list-item-sub-title class="email">{{ email }}</v-list-item-sub-title>
            </v-list-item-content>
          </v-list-item>
        </v-container>
        <v-divider class="mt-0 mb-2"></v-divider>
        <h1>teste</h1>
      </v-card-text>
    </v-card>
  </v-dialog>

</template>

<script>
export default {
  name: 'profile',
  data: () => ({
    dialog: false
  }),
  computed: {
    nome: function () {
      return this.$store.getters['user/getUser'].name
    },
    email: function () {
      return this.$store.getters['user/getUser'].email
    },
    avatar: function () {
      return this.$store.getters['user/getUser'].picture
    }
  }
}
</script>
</script>

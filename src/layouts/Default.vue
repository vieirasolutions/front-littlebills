<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list
        dense
        rounded
      >
        <v-list-item
          link
          to="/"
        >
          <v-list-item-icon>
            <v-icon>dashboard</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
          to="/despesas"
        >
          <v-list-item-icon>
            <v-icon>dashboard</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Despesas</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
          to="/receitas"
        >
          <v-list-item-icon>
            <v-icon>dashboard</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Receitas</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Little Bills</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu
        transition="scroll-y-transition"
        offset-y
        :max-width="300"
      >
        <template v-slot:activator="{ on }">

          <v-btn
            v-on="on"
            icon
          >
            <v-icon>person</v-icon>
          </v-btn>
        </template>
        <v-list>
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

          <v-divider></v-divider>
          <v-list-item link>
            <v-list-item-action>
              <v-icon>person</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title @click="editarPerfil()">Editar perfil</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-list>
      </v-menu>
      <v-btn
        icon
        to="/login"
      >
        <v-icon>exit_to_app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <v-card class="pa-3">

          <router-view />
          <Snackbar />
        </v-card>
      </v-container>
    </v-content>

    <EditProfile />
  </v-app>
</template>

<script>

export default {
  name: 'dashboard',
  components: { EditProfile: () => import('@/components/EditProfile.vue'), Snackbar: () => import('@/components/Snackbar.vue') },
  data: () => ({
    drawer: true
  }),
  methods: {
    editarPerfil () {
      this.$store.state.editProfile = true
    }
  },
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

<style language="scss">
.email {
  font-size: 14px;
}
</style>

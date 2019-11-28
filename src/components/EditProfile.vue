<template>
  <v-dialog
    v-model="dialog"
    max-width="800px"
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
        <v-container>
          <ValidationObserver
            ref="observer"
            tag="form"
          >
            <v-form>
              <ValidationProvider
                mode="lazy"
                name="nome"
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  color="accent"
                  v-model="name"
                  label="Nome"
                  name="nome"
                  prepend-icon="person"
                  autocomplete="off"
                  :persistent-hint="errors.length > 0"
                  :error="errors.length > 0"
                  :hint="errors[0]"
                  type="text"
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider
                ref="data_nascimento"
                mode="lazy"
                name="data_nascimento"
                rules="date_format|required"
                v-slot="{ errors }"
              >
                <v-text-field
                  color="accent"
                  prepend-icon="date_range"
                  label="Data de nascimento"
                  v-mask="'##/##/####'"
                  v-model="birthDate"
                  :persistent-hint="errors.length > 0"
                  :error="errors.length > 0"
                  :hint="errors[0]"
                ></v-text-field>
              </ValidationProvider>
              <v-btn
                :loading="loadingUpdate"
                width="100%"
                color="primary"
                @click="updateProfile()"
              >Atualizar</v-btn>
            </v-form>
          </ValidationObserver>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>

</template>

<script>
import api from '@/api'
export default {
  name: 'profile',
  data: () => ({
    loadingUpdate: false,
    name: '',
    birthDate: ''
  }),
  methods: {
    async updateProfile () {
      const isValid = await this.$refs.observer.validate()
      this.loadingUpdate = true
      if (isValid) {
        api({
          url: '/users/' + this.$store.getters['user/getUser'].id,
          method: 'PUT',
          data: {
            name: this.name,
            birthDate: this.birthDate,
            picture: this.$store.getters['user/getUser'].picture,
            sex: this.$store.getters['user/getUser'].sex,
            email: this.$store.getters['user/getUser'].email
          }
        })
          .then(({ status, data }) => {
            api({ url: '/users/me', method: 'GET' })
              .then(({ status, data }) => {
                if (status === 200) {
                  this.$store.dispatch('user/setUser', data)
                }
              })
              .then(() => {
                api({ url: '/wallets?user=' + this.$store.getters['user/getUser'].id, method: 'GET' })
                  .then(({ status, data }) => {
                    if (status === 200) {
                      this.$store.dispatch('user/setWallet', data[0])
                      this.loadingUpdate = false
                      this.$store.dispatch('snackbar/openSnackbar', { text: 'Sucesso! Dados atualizados', color: 'success', timeout: 6000 })
                    }
                  })
              })
          })
      }
    }
  },
  created () {
    this.name = this.$store.getters['user/getUser'].name
    this.birthDate = this.$moment(this.$store.getters['user/getUser'].birthDate).format('MM/DD/YYYY')
  },
  computed: {
    dialog: {
      get () {
        return this.$store.state.editProfile
      },
      set (value) {
        this.$store.state.editProfile = value
      }
    },
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

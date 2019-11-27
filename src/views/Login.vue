<template>
  <v-content>
    <v-container
      fluid
      fill-height
    >
      <v-layout
        align-center
        justify-center
      >
        <v-flex
          xs12
          sm8
          md4
        >
          <v-card class="elevation-12 login-card radius-20">
            <v-toolbar
              color="primary"
              dark
              flat
            >
              <v-toolbar-title>Little Bills</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <ValidationObserver
                ref="observer"
                tag="form"
              >
                <v-form>
                  <ValidationProvider
                    mode="lazy"
                    name="email"
                    rules="email|required"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      color="accent"
                      v-model="email"
                      label="E-mail"
                      name="email"
                      prepend-icon="person"
                      autocomplete="off"
                      :persistent-hint="errors.length > 0"
                      :error="errors.length > 0"
                      :hint="errors[0]"
                      type="text"
                    ></v-text-field>
                  </ValidationProvider>
                  <ValidationProvider
                    mode="lazy"
                    name="password"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      v-model="password"
                      color="accent"
                      id="password"
                      label="Password"
                      name="password"
                      prepend-icon="lock"
                      :type="defineTipoCampoSenha"
                      :persistent-hint="errors.length > 0"
                      :error="errors.length > 0"
                      :hint="errors[0]"
                    >
                      <template slot="append">
                        <v-icon @click="verVenha = !verVenha">{{ iconeSenha }}</v-icon>
                      </template>
                    </v-text-field>
                  </ValidationProvider>
                </v-form>
              </ValidationObserver>
            </v-card-text>
            <v-card-actions class="ml-1 mr-1">
              <v-spacer></v-spacer>
              <v-btn
                :loading="loadingLogin"
                width="100%"
                color="primary"
                @click="logar()"
              >Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import api from '@/api'
export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: '',
      verVenha: false,
      loadingLogin: false
    }
  },
  methods: {
    async logar () {
      const isValid = await this.$refs.observer.validate()
      if (isValid) {
        this.loadingLogin = true
        api({
          url: '/auth',
          method: 'POST',
          auth: {
            username: this.email,
            password: this.password
          }
        })
          .then(({ status, data }) => {
            if (status === 201) {
              localStorage.setItem('lb_access_token', data.token)
              this.$router.push('/')
            }
          })
          .catch(() => {
            this.$store.dispatch('snackbar/openSnackbar', { text: 'Dados incorretos!', color: 'error', timeout: 6000 })
          })
          .finally(() => {
            this.loadingLogin = false
          })
      }
    }
  },
  computed: {
    defineTipoCampoSenha () {
      return this.verVenha ? 'text' : 'password'
    },
    iconeSenha () {
      return this.verVenha ? 'visibility' : 'visibility_off'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

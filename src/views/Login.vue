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
          <v-card class="elevation-12">
            <v-toolbar
              color="primary"
              dark
              flat
            >
              <v-toolbar-title>Little Bills</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <ValidationProvider
                  mode="lazy"
                  name="email"
                  rules="email"
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

                <v-text-field
                  color="accent"
                  id="password"
                  label="Password"
                  name="password"
                  prepend-icon="lock"
                  :type="defineTipoCampoSenha"
                >
                  <template slot="append">
                    <v-icon @click="verVenha = !verVenha">{{ iconeSenha }}</v-icon>
                  </template>
                </v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions class="ml-1 mr-1">
              <v-spacer></v-spacer>
              <v-btn
                width="100%"
                color="primary"
              >Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      email: '',
      verVenha: false
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

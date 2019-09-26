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
              <v-toolbar-title>Criar conta</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-btn
                    v-show="showEtapaHorizontal2"
                    icon
                    large
                    @click="showEtapaHorizontal2 = false"
                    v-on="on"
                  >
                    <v-icon>arrow_back</v-icon>
                  </v-btn>
                </template>
                <span>Voltar</span>
              </v-tooltip>
            </v-toolbar>
            <v-card-text class="pa-0">
              <v-scroll-x-transition v-on:after-leave="showEtapaHorizontal2 = true">

                <div
                  v-show="showEtapaHorizontal1"
                  class="etapa-1"
                >
                  <v-stepper
                    class="ma-0 radius-bl-br-20 elevation-0"
                    v-model="etapaVertical"
                    vertical
                  >
                    <v-stepper-step
                      :complete="etapaVertical > 1"
                      step="1"
                    >{{ textoEtapa1 }}</v-stepper-step>

                    <v-stepper-content step="1">
                      <ValidationProvider
                        ref="nome"
                        mode="lazy"
                        name="nome"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <v-text-field
                          color="accent"
                          v-model="nome"
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
                      <v-btn
                        color="primary"
                        @click="tratarEtapa1()"
                      >Continuar</v-btn>
                    </v-stepper-content>

                    <v-stepper-step
                      :complete="etapaVertical > 2"
                      step="2"
                    >{{ textoEtapa2 }}</v-stepper-step>

                    <v-stepper-content step="2">
                      <ValidationProvider
                        ref="genero"
                        mode="lazy"
                        name="genero"
                        rules="required_input_group"
                        v-slot="{ errors }"
                      >
                        <v-radio-group
                          v-model="genero"
                          :mandatory="false"
                          :persistent-hint="errors.length > 0"
                          :error="errors.length > 0"
                          :hint="errors[0]"
                          name="genero"
                        >
                          <v-radio
                            label="Masculino"
                            value="M"
                            :error="errors.length > 0"
                          ></v-radio>
                          <v-radio
                            label="Feminino"
                            value="F"
                            :error="errors.length > 0"
                          ></v-radio>
                        </v-radio-group>
                      </ValidationProvider>
                      <v-btn
                        color="primary"
                        @click="tratarEtapa2()"
                      >Continuar</v-btn>
                    </v-stepper-content>

                    <v-stepper-step
                      :complete="etapaVertical > 3"
                      step="3"
                    >{{ textoEtapa3 }}</v-stepper-step>

                    <v-stepper-content step="3">
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
                          v-model="dataNascimento"
                          :persistent-hint="errors.length > 0"
                          :error="errors.length > 0"
                          :hint="errors[0]"
                        ></v-text-field>
                      </ValidationProvider>
                      <v-btn
                        color="primary"
                        @click="tratarEtapa3()"
                      >Continuar</v-btn>
                    </v-stepper-content>
                  </v-stepper>
                </div>
              </v-scroll-x-transition>
              <v-scroll-x-reverse-transition v-on:after-leave="showEtapaHorizontal1 = true">

                <div
                  v-show="showEtapaHorizontal2"
                  class="etapa-2 pa-5"
                >
                  <ValidationObserver
                    ref="observer"
                    tag="form"
                  >
                    <v-row>
                      <v-col cols="12">
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
                            type="password"
                            prepend-icon="lock"
                            :persistent-hint="errors.length > 0"
                            :error="errors.length > 0"
                            :hint="errors[0]"
                          >
                          </v-text-field>
                        </ValidationProvider>
                        <ValidationProvider
                          mode="lazy"
                          name="confirm_password"
                          :rules="{ required: true, password_confirm: {password: password}}"
                          v-slot="{ errors }"
                        >
                          <v-text-field
                            v-model="confirm_password"
                            color="accent"
                            id="confirm_password"
                            label="Confirmação de Senha"
                            name="confirm_password"
                            type="password"
                            prepend-icon="lock"
                            :persistent-hint="errors.length > 0"
                            :error="errors.length > 0"
                            :hint="errors[0]"
                          >
                          </v-text-field>
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                  </ValidationObserver>

                  <v-btn
                    color="primary"
                    width="100%"
                    @click="criarConta()"
                  >
                    Criar conta
                  </v-btn>
                </div>
              </v-scroll-x-reverse-transition>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'cadastro',
  data () {
    return {
      confirm_password: '',
      password: '',
      email: '',
      etapaVertical: 1,
      etapaHorizontal: 1,
      showEtapaHorizontal1: true,
      showEtapaHorizontal2: false,
      textoEtapa1: 'Precisamos saber seu nome...',
      textoEtapa2: 'Qual seu gênero?',
      textoEtapa3: 'Qual sua data de nascimento?',
      nome: '',
      genero: {},
      nomeGeneros: { 'M': 'Masculino', 'F': 'Feminino' },
      dataNascimento: ''
    }
  },
  methods: {
    async tratarEtapa1 () {
      let validacao = await this.$refs.nome.validate()
      if (validacao.valid) {
        this.textoEtapa1 = `Seja bem vindo, ${this.nome}`
        this.etapaVertical = 2
      }
    },
    async tratarEtapa2 () {
      let validacao = await this.$refs.genero.validate()
      if (validacao.valid) {
        this.textoEtapa2 = `${this.nomeGeneros[this.genero]}`
        this.etapaVertical = 3
      }
    },
    async tratarEtapa3 () {
      let validacao = await this.$refs.data_nascimento.validate()
      if (validacao.valid) {
        let idade = this.$moment().diff(this.$moment(this.dataNascimento, 'd/m/Y'), 'years')
        this.textoEtapa3 = `Que legal! Você tem ${idade} anos.`
        setTimeout(() => {
          this.showEtapaHorizontal1 = false
        }, 500)
      }
    },
    async criarConta () {
      const isValid = await this.$refs.observer.validate()
      if (isValid) {
        // Call back-end'
      }
    }
  }
}
</script>

<style language="scss" scoped>
.radius-bl-br-20 {
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}
</style>

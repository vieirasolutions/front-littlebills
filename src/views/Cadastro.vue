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
            </v-toolbar>
            <v-card-text class="pa-0">
              <v-stepper v-model="etapaHorizontal">
                <v-stepper-header>
                  <v-stepper-step
                    :complete="etapaHorizontal > 1"
                    step="1"
                  >Dados pessoais</v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step
                    :complete="etapaHorizontal > 2"
                    step="2"
                  >Dados de acesso</v-stepper-step>

                </v-stepper-header>

                <v-stepper-items>
                  <v-stepper-content step="1">

                    <v-stepper
                      class="ma-0"
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
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <v-radio-group
                            v-model="genero"
                            :mandatory="false"
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
                        <v-text-field
                          color="accent"
                          prepend-icon="date_range"
                          label="Data de nascimento"
                          v-mask="'##/##/####'"
                          v-model="dataNascimento"
                        ></v-text-field>
                        <v-btn
                          color="primary"
                          @click="tratarEtapa3()"
                        >Continuar</v-btn>
                      </v-stepper-content>
                    </v-stepper>
                  </v-stepper-content>

                  <v-stepper-content step="2">
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          color="accent"
                          prepend-icon="email"
                          label="Email"
                        >
                        </v-text-field>
                        <v-text-field
                          color="accent"
                          prepend-icon="lock"
                          label="Senha"
                        >
                        </v-text-field>
                        <v-text-field
                          color="accent"
                          prepend-icon="lock"
                          label="Confirmação de senha"
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>

                    <v-btn
                      color="primary"
                      @click="etapaHorizontal = 3"
                      width="100%"
                    >
                      Criar conta
                    </v-btn>

                  </v-stepper-content>
                </v-stepper-items>
              </v-stepper>
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
      etapaVertical: 1,
      etapaHorizontal: 1,
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
    tratarEtapa3 () {
      let idade = this.$moment().diff(this.$moment(this.dataNascimento, 'd/m/Y'), 'years')
      this.textoEtapa3 = `Que legal! Você tem ${idade} anos.`
      setTimeout(() => {
        this.etapaHorizontal = 2
      }, 500)
    }
  }
}
</script>

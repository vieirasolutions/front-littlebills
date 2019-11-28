<template>
  <section>
    <v-data-table
      :search="search"
      :headers="headers"
      :items="desserts"
      sort-by="calories"
      class="elevation-0"
    >
      <template v-slot:top>
        <v-toolbar
          flat
          color="white"
        >
          <v-toolbar-title>Receitas</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <template v-slot:activator="{ on }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-on="on"
              >Nova Receita</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <ValidationObserver
                    ref="observer"
                    tag="form"
                  >
                    <v-row>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <ValidationProvider
                          mode="lazy"
                          name="descricao"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <v-text-field
                            :persistent-hint="errors.length > 0"
                            :error="errors.length > 0"
                            :hint="errors[0]"
                            v-model="editedItem.description"
                            label="Descrição"
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <ValidationProvider
                          mode="lazy"
                          name="valor"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <v-text-field
                            :persistent-hint="errors.length > 0"
                            :error="errors.length > 0"
                            :hint="errors[0]"
                            v-model="editedItem.value"
                            label="Valor"
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <ValidationProvider
                          mode="lazy"
                          name="tipo"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <v-select
                            :persistent-hint="errors.length > 0"
                            :error="errors.length > 0"
                            :hint="errors[0]"
                            v-model="editedItem.category.id"
                            :items="items"
                            item-value="id"
                            item-text="name"
                            return-object
                            label="Tipo"
                          ></v-select>
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                  </ValidationObserver>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >Cancelar</v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  :loading="loadingSave"
                  @click="save"
                >Salvar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
        <v-row class="d-flex justify-start">
          <v-col
            sm="12"
            md="4"
          >
            <v-card-title class="pt-0">
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Buscar"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>

          </v-col>
        </v-row>
      </template>
      <template v-slot:item.action="{ item }">
        <v-btn
          small
          text
          icon
        >
        </v-btn>
        <v-btn
          small
          text
          icon
        >
          <v-icon
            small
            @click="deleteItem(item)"
          >
            delete
          </v-icon>
        </v-btn>
      </template>
      <template v-slot:no-data>
        <span>Nenhum dado a ser exibido</span>
      </template>
    </v-data-table>
  </section>
</template>

<script>
import api from '@/api'
export default {
  name: 'receitas',
  data: () => ({
    loadingSave: false,
    search: '',
    dialog: false,
    items: [],
    headers: [
      {
        text: 'Descrição',
        align: 'left',
        sortable: false,
        value: 'description'
      },
      { text: 'Valor', value: 'value' },
      { text: 'Tipo', value: 'category.name' }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      nome: '',
      value: 0,
      tipo: 0,
      category: {
        id: null
      }
    },
    defaultItem: {
      nome: '',
      value: 0,
      tipo: 0,
      category: {
        id: null
      }
    }
  }),
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Nova Receita' : 'Editar Receita'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  created () {
    this.buscaCategorias()
    this.initialize()
  },

  methods: {
    resetModalCrud () {
      this.editedItem = {}
    },
    persist () {

    },
    buscaCategorias () {
      api({ url: '/categories',
        method: 'GET',
        params: {
          type: 'income',
          user: this.$store.getters['user/getUser'].id
        } })
        .then(({ status, data }) => {
          this.items = data.rows
        })
    },
    initialize () {
      api({ url: '/transactions',
        method: 'GET',
        params: {
          categoryType: 'income',
          user: this.$store.getters['user/getUser'].id
        } })
        .then(({ status, data }) => {
          this.desserts = data.rows
        })
    },

    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.desserts.indexOf(item)
      confirm('Tem certeza que deseja deletar esta Receita?') && this.desserts.splice(index, 1)
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      this.loadingSave = true
      api({ url: '/transactions',
        method: 'POST',
        data: {
          'wallet': this.$store.getters['user/getWallet'].id,
          'id': this.editedIndex !== -1 ? this.editedItem.id : '',
          'category': this.editedItem.category.id.id,
          'value': this.editedItem.value,
          'description': this.editedItem.description,
          '_method': this.editedIndex !== -1 ? 'PUT' : 'POST'
        } })
        .then(({ status, data }) => {
          // created
          if (status === 201) {
            this.$store.dispatch('snackbar/openSnackbar', { text: 'Receita inserida com sucesso!', color: 'success', timeout: 6000 })
            this.initialize()
          }
        })
        .finally(() => {
          this.loadingSave = false
        })
      this.close()
    }
  }

}
</script>

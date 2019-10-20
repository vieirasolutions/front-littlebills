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
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.descricao"
                        label="Descrição"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.valor"
                        label="Valor"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-select
                        v-model="editedItem.tipo"
                        :items="items"
                        label="Tipo"
                      ></v-select>
                    </v-col>
                  </v-row>
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
          <v-icon
            small
            @click="editItem(item)"
          >
            edit
          </v-icon>
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
        <v-btn
          color="primary"
          @click="initialize"
        >Reset</v-btn>
      </template>
    </v-data-table>
  </section>
</template>

<script>

export default {
  name: 'receitas',
  data: () => ({
    search: '',
    dialog: false,
    items: ['Mesada', 'Salário', 'Presente', 'Rendimento'],
    headers: [
      {
        text: 'Descrição',
        align: 'left',
        sortable: false,
        value: 'descricao'
      },
      { text: 'Valor', value: 'valor' },
      { text: 'Tipo', value: 'tipo' },
      { text: 'Ações', value: 'action', sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      nome: '',
      valor: 0,
      tipo: 0
    },
    defaultItem: {
      nome: '',
      valor: 0,
      tipo: 0
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
    this.initialize()
  },

  methods: {
    initialize () {
      this.desserts = [
        {
          descricao: 'Mesada da mamãe',
          valor: 80,
          tipo: 'Mesada'
        },
        {
          descricao: 'Presente do vô',
          valor: 30,
          tipo: 'Presente'
        }
      ]
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
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    }
  }

}
</script>

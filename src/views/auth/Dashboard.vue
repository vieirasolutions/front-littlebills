<template>
  <section>
    <h1>Dashboard</h1>
    <div>
      <h4>Gráfico de Receitas</h4>
      <VueApexCharts
        v-if="refresh"
        type=bar
        height=350
        :options="chartOptions"
        :series="series"
      />
      <h4>Gráfico de Despesas</h4>
      <VueApexCharts
        v-if="refreshDespesa"
        type=bar
        height=350
        :options="chartOptionsDespesa"
        :series="seriesDespesa"
      />
    </div>
  </section>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import api from '@/api'
export default {
  name: 'dashboard',
  components: { VueApexCharts: VueApexCharts },
  data: () => ({
    refresh: false,
    refreshDespesa: false,
    series: [{
      name: 'Valor',
      data: []
    }],
    seriesDespesa: [{
      name: 'Valor',
      data: []
    }],
    chartOptions: {
      chart: {
        height: 350,
        type: 'bar'
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: 'top' // top, center, bottom
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ['#304758']
        }
      },

      xaxis: {
        categories: ['teste', 'aa'],
        position: 'top',
        labels: {
          offsetY: -18

        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5
            }
          }
        },
        tooltip: {
          enabled: true,
          offsetY: -35

        }
      },
      fill: {
        gradient: {
          shade: 'light',
          type: 'horizontal',
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100]
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: false,
          formatter: function (val) {
            return `R$ ${val}`
          }
        }

      },
      title: {
        text: 'Total de receitas por categoria',
        floating: true,
        offsetY: 320,
        align: 'center',
        style: {
          color: '#444'
        }
      }
    },
    chartOptionsDespesa: {

      colors: ['#F44336'],
      chart: {
        height: 350,
        type: 'bar'
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: 'top' // top, center, bottom
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ['#304758']
        }
      },

      xaxis: {
        categories: ['teste', 'aa'],
        position: 'top',
        labels: {
          offsetY: -18

        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5
            }
          }
        },
        tooltip: {
          enabled: true,
          offsetY: -35

        }
      },
      fill: {
        gradient: {
          shade: 'light',
          type: 'horizontal',
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100]
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: false,
          formatter: function (val) {
            return `R$ ${val}`
          }
        }

      },
      title: {
        text: 'Total de despesas por categoria',
        floating: true,
        offsetY: 320,
        align: 'center',
        style: {
          color: '#444'
        }
      }
    }
  }),
  created () {
    this.getReceitas()
    this.getDespesas()
    this.getCategories()
    this.getCategoriesDespesa()
  },
  methods: {
    getReceitas () {
      api({ url: '/transactions',
        method: 'GET',
        params: {
          categoryType: 'income',
          user: this.$store.getters['user/getUser'].id
        } })
        .then(({ status, data }) => {
          let teste = {
            rendimento: 0,
            presente: 0,
            mesada: 0,
            salario: 0
          }
          data.rows.map(r => {
            if (r.category.name == 'Rendimento') {
              teste.rendimento += r.value
            }
            if (r.category.name == 'Presente') {
              teste.presente += r.value
            }
            if (r.category.name == 'Mesada') {
              teste.mesada += r.value
            }
            if (r.category.name == 'Salário') {
              teste.salario += r.value
            }
          })
          // this.series[0].data.push(teste.rendimento)
          // this.series[0].data.push(teste.presente)
          this.series[0].data.push(teste.mesada)
          this.series[0].data.push(teste.salario)
        })
    },
    getDespesas () {
      api({ url: '/transactions',
        method: 'GET',
        params: {
          categoryType: 'expense',
          user: this.$store.getters['user/getUser'].id
        } })
        .then(({ status, data }) => {
          let teste = {
            roupas: 0,
            brinquedos: 0,
            comida: 0,
            material: 0
          }
          data.rows.map(r => {
            if (r.category.name == 'Roupas') {
              teste.roupas += r.value
            }
            if (r.category.name == 'Brinquedos') {
              teste.brinquedos += r.value
            }
            if (r.category.name == 'Comida') {
              teste.comida += r.value
            }
            if (r.category.name == 'Material Escolar') {
              teste.material += r.value
            }
          })
          this.seriesDespesa[0].data.push(teste.material)
          this.seriesDespesa[0].data.push(teste.roupas)
          // this.seriesDespesa[0].data.push(teste.brinquedos)
          // this.seriesDespesa[0].data.push(teste.comida)
        })
    },
    getCategories () {
      api({ url: '/categories',
        method: 'GET',
        params: {
          type: 'income',
          user: this.$store.getters['user/getUser'].id
        } })
        .then(({ status, data }) => {
          console.log(data.rows.map(c => c.name))
          this.chartOptions.xaxis.categories = data.rows.map(c => c.name).sort()
          this.refresh = true
        })
    },
    getCategoriesDespesa () {
      api({ url: '/categories',
        method: 'GET',
        params: {
          type: 'expense',
          user: this.$store.getters['user/getUser'].id
        } })
        .then(({ status, data }) => {
          console.log(data.rows.map(c => c.name))
          this.chartOptionsDespesa.xaxis.categories = data.rows.map(c => c.name).sort()
          this.refreshDespesa = true
        })
    }
  }
}
</script>

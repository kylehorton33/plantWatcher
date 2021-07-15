<template>
  <v-app id="inspire">
    <MainNav @filter="filter" />
    <v-main class="grey lighten-2">
      <PlantGrid :plants="filteredPlants" />
    </v-main>
  </v-app>
</template>

<script>
import MainNav from '../components/MainNav.vue'
import PlantGrid from '../components/PlantGrid.vue'

  export default {
    components: {
      MainNav, PlantGrid
    },
    data() {
      return {
        filterText: '',
      }
    },
    computed: {
      plants() {
        return this.$store.getters.loadedPlants
      },
      filteredPlants() {
        if (!this.filterText) {
          return this.plants
        } else {
          return this.plants.filter((p) => {
            return p.name.includes(this.filterText)
          })
        }
      }
    },
    methods: {
      filter(text) {
        this.filterText = text
      }
    }
  }
</script>

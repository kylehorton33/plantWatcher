<template>
  <v-app id="inspire">
    <MainNav />
    
    <v-main class="grey lighten-2">
      <PlantGrid />
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
  }
</script>

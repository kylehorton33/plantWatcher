<template>
  <v-app id="inspire">
    <MainNav />
    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <PlantTitle />
        </v-row>
        <v-row>
          <CycleIcons />
        </v-row>
        <v-row>
          <v-col cols="3">
            <LogScroll />
          </v-col>
          <v-col cols="9">
            <PlantImage />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import MainNav from '../components/MainNav.vue'
import PlantTitle from '../components/PlantTitle.vue'
import CycleIcons from '../components/CycleIcons.vue'
import LogScroll from '../components/LogScroll.vue'
import PlantImage from '../components/PlantImage.vue'


  export default {
    components: {
      MainNav, PlantTitle, CycleIcons, LogScroll, PlantImage
    },
    created() {
        this.$store.dispatch('focusPlant', this.$route.params.id);
    },
    computed: {
      plant() {
        return this.$store.getters.loadedPlant(this.plantId);
      },
      logs() {
        return this.$store.getters.singlePlantLogs(this.plantId);
      }
    },
    methods: {
        goToAllPlants() {
            this.$router.push('/');
        }
    }
  }
</script>

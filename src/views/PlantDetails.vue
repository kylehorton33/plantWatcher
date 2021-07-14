<template>
  <v-app id="inspire">
    <MainNav />
    <v-main class="grey lighten-3" :style="{ 'padding' : '0px' }">
      <v-container :style="{ 'max-width': '960px' }">
        <v-row>
          <v-col cols="10">
            <PlantTitle :plant="plant" />
          </v-col>
          <v-col cols="2" align="right" class="mt-2">
            <v-icon>mdi-cog</v-icon>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3">
            <v-row>
              <v-col>
                <CycleIcons :plant="plant" />
              </v-col>
            </v-row>
            <LogScroll :logs="logs" />
          </v-col>
          <v-col cols="9">
            <PlantImage :plant="plant" />
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
    data() {
      return {
        id: null,
      }
    },
    created() {
        this.id = this.$route.params.id;
        if (!this.id) {
          this.id = 'new'
        }
    },
    computed: {
        plant() {
            return this.$store.getters.loadedPlant(this.id)
        },
        logs() {
            return this.$store.getters.singlePlantLogs(this.id)
        }
    },
    methods: {
        goToAllPlants() {
            this.$router.push('/');
        }
    }
  }
</script>

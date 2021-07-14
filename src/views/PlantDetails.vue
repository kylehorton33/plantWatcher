<template>
  <v-app id="inspire">
    <MainNav />
    <v-main class="grey lighten-3" :style="{ 'padding' : '0px' }">
      <v-container :style="{ 'max-width': '960px' }">
        <v-row v-if="editMode">
          <v-col align="center">
            <div class="pill">
              edit mode
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="10">
            <PlantTitle :plant="plant" />
          </v-col>
          <v-col cols="2" align="right" class="mt-2">
            <v-icon>mdi-cog</v-icon>
            <v-icon
              v-if="id === 'new'"
              @click="savePlant"
            >
              mdi-content-save
            </v-icon>
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
    // bad way to handle id - does not update when accessing 'new' from single plant
    data() {
      return {
        id: null,
      }
    },
    created() {
        this.id = this.$route.params.id;
        if (!this.id) {
          this.id = 'new'
          this.$store.commit('enterEditMode')
        }
    },
    computed: {
        plant() {
            return this.$store.getters.loadedPlant(this.$route.params.id || 'new')
        },
        logs() {
            return this.$store.getters.singlePlantLogs(this.$route.params.id || 'new')
        },
        editMode() {
          return this.$store.getters.editMode
        }
    },
    methods: {
        goToAllPlants() {
          this.$router.push('/');
        },
        savePlant() {
          this.$store.dispatch('createPlant')
          this.$router.push('/');
        }
    }
  }
</script>

<style scoped>
.pill {
  background-color: rgba(251, 255, 0, 0.842);
  border: none;
  color:#444;
  padding: 5px 40px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 16px;
}
</style>
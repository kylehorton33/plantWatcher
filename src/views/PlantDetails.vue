<template>
  <v-app id="inspire">
    <MainNav @filter="filter" />
    <v-main class="grey lighten-3" :style="{ 'padding' : '0px' }">
      <v-container :style="{ 'max-width': '960px' }" v-if="plant">
        <v-row>
          <v-col cols="10">
            <PlantTitle :plant="plant" />
          </v-col>
          <v-col cols="2" align="right" class="mt-2">
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="10" offset="1" v-if="mobile">
            <PlantImage :plant="plant" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-row>
              <v-col>
                <CycleIcons :plant="plant" />
              </v-col>
            </v-row>
            <LogScroll :logs="filteredLogs" />
          </v-col>
          <v-col v-if="!mobile" cols="7">
            <PlantImage :plant="plant" />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-btn text class="error" @click="deletePlant">delete me :(</v-btn>
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
        filterText: "",
      }
    },
    created() {
        this.id = this.$route.params.id;
        this.$store.dispatch('loadSinglePlant', this.id)
        if (!this.id) {
          this.id = 'new'
          this.$store.commit('enterEditMode')
        }
    },
    computed: {
        plant() {
          return this.$store.getters.singlePlant
        },
        logs() {
            return this.$store.getters.singlePlantLogs(this.$route.params.id || 'new')
        },
        editMode() {
          return this.$store.getters.editMode
        },
        filteredLogs() {
          if (!this.filterText) {
            return this.logs
          } else {
            return this.logs.filter((l) => {
              return l.msg.includes(this.filterText)
            })
          }
        },
        mobile() {
          return this.$vuetify.breakpoint.xs
        },
    },
    methods: {
        goToAllPlants() {
          this.$router.push('/');
        },
        savePlant() {
          this.$store.dispatch('createPlant')
          this.$router.push('/');
        },
        deletePlant() {
          this.$store.dispatch('deletePlant', this.id)
          this.$router.push('/');
        },
        filter(filterText) {
          this.filterText = filterText
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
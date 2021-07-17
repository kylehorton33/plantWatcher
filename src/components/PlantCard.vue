<template>
  <v-card elevation="3">
    <v-img
    class="white--text align-end"
    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
    :src="plant.latest_pic"
    height="200px"
    >
        <v-card-title v-text="plant.name.toUpperCase()"></v-card-title>
    </v-img>
    <v-card-actions v-if="id === 'new'" class="justify-center">
      <v-btn text @click="goToPlantPage(id)">
        create new
      </v-btn>
    </v-card-actions>
    <v-card-actions v-else class="justify-center">
        <!-- add loaders: https://vuetifyjs.com/en/components/buttons/ -->
        <v-btn icon @click="waterIt(id)">
            <v-icon>mdi-watering-can-outline</v-icon>
        </v-btn>
        <v-btn icon @click="happyButton(id)">
            <v-icon class="success--text">mdi-emoticon-happy</v-icon>
        </v-btn>
        <v-btn icon @click="sadButton(id)">
            <v-icon class="error--text">mdi-emoticon-sad</v-icon>
        </v-btn>
        <v-btn icon @click="goToPlantPage(id)">
            <v-icon>mdi-information-outline</v-icon>
        </v-btn>
    </v-card-actions>
</v-card>
</template>

<script>
export default {
    props: ['id'],
    computed: {
        plant() {
            return this.$store.getters.loadedPlant(this.id)
        }
    },
    methods: {
      waterIt(plant_id) {
        this.$store.dispatch('addLog', {
          plant_id,
          icon: 'mdi-watering-can-outline',
          msg: 'wet wet wet!',
        })
      },
      goToPlantPage(id) {
        this.$router.push(`/plant/${id}`);
      },
      happyButton(plant_id) {
        this.$store.dispatch('addLog', {
          plant_id,
          icon: 'mdi-emoticon-happy',
          msg: 'add a smile!',
        })
      },
      sadButton(plant_id) {
        this.$store.dispatch('addLog', {
          plant_id,
          icon: 'mdi-emoticon-sad',
          msg: 'feelin bad...',
        })
      },
    },
}
</script>
<template>
    <v-container fluid>
        <v-row dense>
            <v-col
            v-for="plant in plants"
            :key="plant.id"
            cols="6"
            md="2"
            >
             <PlantCard :id="plant.id"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import PlantCard from '../components/PlantCard.vue'

export default {
    components: {
        PlantCard
    },
    computed: {
      plants() {
        return this.$store.getters.loadedPlants
      },
    },
}
</script>
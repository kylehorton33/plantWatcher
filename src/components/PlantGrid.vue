<template>
    <v-container>
        <v-row>
            <v-col
                v-for="plant in plants"
                :key="plant.id"
                cols="12"
                sm="6"
                md="4"
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
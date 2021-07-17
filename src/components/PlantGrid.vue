<template>
    <v-container>
        <v-row>
            <v-col
                v-for="plant in plants"
                :key="plant.uuid"
                cols="12"
                sm="6"
                md="4"
            >
             <PlantCard :id="plant.uuid"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import PlantCard from '../components/PlantCard.vue'

export default {
    props: ['plants'],
    components: {
        PlantCard
    }
}
</script>
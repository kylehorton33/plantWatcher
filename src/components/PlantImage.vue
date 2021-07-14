<template>
    <v-card
        min-height="70vh"
        rounded="lg"
    >
        <v-img v-if="plant" :src="plant.latest_pic"></v-img>
    </v-card>
</template>

<script>
export default {
    computed: {
        id() {
            return this.$store.getters.focusedPlantId
        },
        plant() {
            return this.$store.getters.loadedPlant(this.id)
        }
    }
}
</script>

<style>

</style>
<template>
    <div>
        <h1>{{  plant.name.toUpperCase() }}</h1>
        <h6>
            <v-icon>mdi-home</v-icon>
            {{ plant.location.toUpperCase() }}
        </h6>
        <h6>
            <v-icon>mdi-calendar-month</v-icon>
            Growing since July 14 2021
        </h6>
    </div>
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
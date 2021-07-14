<template>
    <div>
        <h1>{{  plant.name.toUpperCase() }}</h1>
        <h5>{{ plant.location.toUpperCase() }}</h5>
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
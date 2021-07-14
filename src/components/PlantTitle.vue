<template>
    <div>
        <h1>{{  plant.name.toUpperCase() }}</h1>
        <h6>
            <v-icon>mdi-home</v-icon>
            {{ plant.location.toUpperCase() }}
        </h6>
        <h6>
            <v-icon>mdi-calendar-month</v-icon>
            Growing together since {{ new Date(plant.added_at).toLocaleDateString() }}
        </h6>
    </div>
</template>

<script>
export default {
    props: ['plant'],
    data() {
        return {
            name: '',
        }
    },
    computed: {
        editMode() {
          return this.$store.getters.editMode
        }
    }
}
</script>

<style>

</style>
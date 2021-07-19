<template>
    <v-img v-if="plant" :src="imgUrl"></v-img>
</template>

<script>
export default {
    props: ['plant'],
    computed: {
        imgUrl() {
            return `http://${window.location.host}/${this.plant.latest_pic}`
        }
    }
}
</script>

<style>

</style>

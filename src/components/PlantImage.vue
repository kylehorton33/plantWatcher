<template>
    <v-img v-if="plant" :src="plant.latest_pic"></v-img>
</template>

<script>
export default {
    props: ['plant']
}
</script>

<style>

</style>
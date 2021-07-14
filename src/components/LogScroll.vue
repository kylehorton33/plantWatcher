<template>
  <v-sheet rounded="lg">
    <v-list color="transparent">
        <v-list-item
            v-for="log in logs"
            :key="log.timestamp"
            link
        >
            <v-list-item-content>
            <v-list-item-title>
                <v-icon class="mr-2">{{ log.icon }}</v-icon>
                {{ log.msg }}
            </v-list-item-title>
            <v-list-item-subtitle>
                {{ new Date(log.timestamp) }}
            </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        </v-list>
    </v-sheet>
</template>

<script>
export default {
    computed: {
        id() {
            return this.$store.getters.focusedPlantId
        },
        logs() {
            return this.$store.getters.singlePlantLogs(this.id)
        }
    }
}
</script>

<style>

</style>
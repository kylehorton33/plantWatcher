<template>
  <v-sheet rounded="lg">
    <v-list color="transparent">
        <v-list-item
            v-for="log in logs"
            :key="log.timestamp"
        >
            <v-list-item-content>
            <v-list-item-title>
                <v-icon class="mr-2">{{ log.icon }}</v-icon>
                {{ log.msg }}
            </v-list-item-title>
            <v-list-item-subtitle>
                {{ new Date(log.timestamp).toLocaleDateString() }}
            </v-list-item-subtitle>
            </v-list-item-content>
            <v-btn icon @click="onDeleteLog(log.id)">
                <v-icon>mdi-delete</v-icon>
            </v-btn>
        </v-list-item>
        </v-list>
    </v-sheet>
</template>

<script>
export default {
    props: ['logs'],
    methods: {
        onDeleteLog(id) {
            console.log(id)
            this.$store.dispatch('deleteLog', id)
        }
    }
}
</script>

<style>

</style>
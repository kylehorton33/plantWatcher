<template>
  <v-list-item>
    <v-list-item-icon>
      <v-icon class="mx-0">{{ log.icon }}</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>
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
</template>

<script>
export default {
  props: ["log"],
  methods: {
    onDeleteLog(id) {
      console.log(id);
      this.$store.dispatch("deleteLog", id);
    },
  },
};
</script>

<style>
</style>
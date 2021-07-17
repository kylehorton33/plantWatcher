<template>
  <v-sheet rounded="lg">
    <v-list color="transparent">
      <v-list-item>
        <v-list-item-icon class="mx-0">
          <v-icon>{{ icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content class="ml-4">
          <v-text-field
            label="Custom Message"
            v-model="msg"
            filled
            rounded
            dense
            :autofocus="true"
            @keyup="keyListener"
          ></v-text-field>
        </v-list-item-content>
        <v-list-item-icon>
          <v-btn icon @click="onAddLog">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-list-item-icon>
      </v-list-item>
      <v-divider></v-divider>
      <Log v-for="log in logs" :log="log" :key="log.timestamp" />
    </v-list>
  </v-sheet>
</template>

<script>
import Log from "./Log.vue";

export default {
  props: ["logs"],
  data() {
    return {
      icon: "mdi-sprout",
      msg: "",
    };
  },
  components: {
    Log,
  },
  methods: {
    onAddLog() {
      const newLog = {
        plant_id: this.$route.params.id,
        icon: this.icon,
        msg: this.msg,
      };
      this.$store.dispatch("addLog", newLog);
      this.msg = "";
    },
    keyListener(e) {
      if (e.key === "Enter") {
        this.onAddLog();
      }
    },
  },
};
</script>

<style>
</style>
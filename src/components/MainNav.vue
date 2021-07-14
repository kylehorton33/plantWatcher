<template>
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-container class="py-0 fill-height">
        <v-avatar
          class="mr-10"
          color="grey darken-1"
          size="32"
        ></v-avatar>

        <v-btn text @click="goToHome">HOME</v-btn>
        <v-btn text @click="goToNewPlant">NEW</v-btn>

        <v-spacer></v-spacer>
        <!-- filter logs by search terms -->
        <v-responsive max-width="260">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive>
      </v-container>
    </v-app-bar>
</template>

<script>
export default {
    methods: {
        goToHome() {
            this.$router.push('/').catch(() => {})
        },
        goToNewPlant() {
            this.$router.push('/plant/new').catch(() => {})
        }
    }
}
</script>
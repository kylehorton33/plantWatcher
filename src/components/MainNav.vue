<template>
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-container class="py-0 fill-height">
        <v-row justify="center">
          <v-col cols="8">
            <v-avatar
              class="mr-8"
              color="grey darken-1"
              size="32"
            ></v-avatar>
              <v-btn text @click="goToHome">HOME</v-btn>
              <v-btn text @click="goToNewPlant">NEW</v-btn>
          </v-col>
          <v-col cols="4" align="right">
            <v-responsive max-width="400">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
            v-model="searchText"
            @input="search"
          ></v-text-field>
        </v-responsive>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
</template>

<script>
export default {
    data() {
      return {
        searchText: '',
      }
    },
    methods: {
        goToHome() {
            this.$router.push('/').catch(() => {})
        },
        goToNewPlant() {
            this.$router.push('/plant/new').catch(() => {})
        },
        search() {
          this.$emit('filter', this.searchText)
        }
    }
}
</script>
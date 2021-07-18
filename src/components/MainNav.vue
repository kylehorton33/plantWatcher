<template>
  <v-app-bar app color="white" flat>
    <v-container class="py-0 fill-height">
      <v-row justify="center">
        <v-col v-if="!searchFocused" cols="7">
          <v-avatar v-if="mobile" class="mr-4" color="grey darken-3" size="32">
            <v-icon size="18" color="green">mdi-sprout</v-icon>
          </v-avatar>
          <v-avatar v-else class="mr-8" color="grey darken-3" size="32">
            <v-icon size="18" color="green">mdi-sprout</v-icon>
          </v-avatar>
          <v-btn v-if="mobile" small text @click="goToHome">HOME</v-btn>
          <v-btn v-else text @click="goToHome">HOME</v-btn>
          <v-btn v-if="mobile" small text @click="goToNewPlant">NEW</v-btn>
          <v-btn v-else text @click="goToNewPlant">NEW</v-btn>
        </v-col>
        <v-col align="right">
          <v-responsive max-width="600">
            <v-text-field
              prepend-inner-icon="mdi-magnify"
              clear-icon="mdi-close-circle"
              clearable
              dense
              flat
              hide-details
              rounded
              solo-inverted
              v-model="searchText"
              @input="search"
              @focus="onSearchFocus"
              @blur="onSearchBlur"
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
      searchText: "",
      searchFocused: false,
    };
  },
  computed: {
    mobile() {
      return this.$vuetify.breakpoint.xs;
    },
  },
  methods: {
    goToHome() {
      this.$router.push("/").catch(() => {});
    },
    goToNewPlant() {
      this.$router.push("/plant/new").catch(() => {});
    },
    search() {
      this.$emit("filter", this.searchText);
      this.searchText = "";
    },
    toggleSearch() {
      this.tapSearch = !this.tapSearch;
    },
    onSearchFocus() {
      this.searchFocused = true
    },
    onSearchBlur() {
      this.searchFocused = false
    }
  },
};
</script>
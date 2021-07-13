<template>
  <v-app id="inspire">
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

        <v-btn text @click="goToAllPlants">ALL</v-btn>
        <v-btn text>HISTORY</v-btn>
        <v-btn text>WIKI</v-btn>

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

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
            <h1 class="mx-8">Plant {{ plant.name }}</h1>
        </v-row>
        <v-row>
          <v-col cols="3">
            <v-sheet rounded="lg">
              <v-list color="transparent">
                <v-list-item
                  v-for="log in plant.logs"
                  :key="log.timestamp"
                  link
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-icon class="mr-2">{{ log.icon }}</v-icon>
                      {{ log.msg }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        {{ log.timestamp }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col cols="9">
            <v-card
              min-height="70vh"
              rounded="lg"
            >
              <v-img v-if="plant" :src="plant.latest_pic"></v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      plantId: null,
    }),
    created() {
        this.plantId = this.$route.params.id;
    },
    computed: {
      plant() {
        return this.$store.getters.loadedPlant(this.plantId);
      }
    },
    methods: {
        goToAllPlants() {
            this.$router.push('/');
        }
    }
  }
</script>

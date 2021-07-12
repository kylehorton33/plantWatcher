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
            <h1 class="mx-8">Plant {{ plantId }}</h1>
        </v-row>
        <v-row>
          <v-col cols="3">
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
              <v-img src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F37%2F2020%2F06%2F10%2Ffrancee-hosta-purple-flowers-562666cc.jpg"></v-img>
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
      logs: [
          { timestamp: 12318973912, msg: 'Looking good!', icon: 'mdi-emoticon-happy' },
          { timestamp: 23489283472, msg: 'Looking good!', icon: 'mdi-emoticon-happy' },
          { timestamp: 34534534522, msg: 'Looking good!', icon: 'mdi-emoticon-happy' },
      ],
    }),
    created() {
        this.plantId = this.$route.params.id;
    },
    methods: {
        goToAllPlants() {
            this.$router.push('/');
        }
    }
  }
</script>

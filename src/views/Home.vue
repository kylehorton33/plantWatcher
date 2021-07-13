<template>
  <v-app id="inspire">
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-avatar class="primary mx-2" size="40">
        <span class="white--text">Ky</span>
      </v-avatar>
      <v-toolbar-title>Plant Watcher</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            {{ username }}'s
            Plant Watcher
          </v-list-item-title>
          <v-list-item-subtitle>
            <!-- -->
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.link"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="grey lighten-2">
      <v-container fluid>
        <v-row dense>
          <v-col
            v-for="plant in plants"
            :key="plant.id"
            cols="6"
            md="2"
          >
            <v-card elevation="3">
              <v-img
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                :src="plant.latest_pic"
                height="200px"
              >
                <v-card-title v-text="plant.name.toUpperCase()"></v-card-title>
              </v-img>
              <v-card-actions>
                <v-spacer></v-spacer>
                <!-- add loaders: https://vuetifyjs.com/en/components/buttons/ -->
                <v-btn icon @click="happyButton(plant.id)">
                  <v-icon class="success--text">mdi-emoticon-happy</v-icon>
                </v-btn>
                <v-btn icon @click="sadButton(plant.id)">
                  <v-icon class="error--text">mdi-emoticon-sad</v-icon>
                </v-btn>
                <v-btn icon @click="uploadNewPhoto(plant.id)">
                  <v-icon>mdi-camera</v-icon>
                </v-btn>
                <v-btn icon @click="goToPlantPage(plant.id)">
                  <v-icon>mdi-information-outline</v-icon>
                </v-btn>
              </v-card-actions>
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
      drawer: null,
      username: 'kingsley',
      items: [
        { title: 'Add', icon: 'mdi-plus', link: '/plant/new' },
        { title: 'Logout', icon: 'mdi-exit-run', link: '/logout' },
        { title: 'About', icon: 'mdi-help-box', link: '/about' },
      ],
      plants: [
        {id: 1, name: 'hosta', latest_pic: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F37%2F2020%2F06%2F10%2Ffrancee-hosta-purple-flowers-562666cc.jpg'},
        {id: 2, name: 'hosta', latest_pic: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F37%2F2020%2F06%2F10%2Ffrancee-hosta-purple-flowers-562666cc.jpg'},
        {id: 3, name: 'hosta', latest_pic: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F37%2F2020%2F06%2F10%2Ffrancee-hosta-purple-flowers-562666cc.jpg'},
      ],
    }),
    methods: {
      goToPlantPage(id) {
        this.$router.push(`/plant/${id}`);
      },
      happyButton(id) {
        alert(`Plant ${id} is HAPPY! :)`)
      },
      sadButton(id) {
        alert(`Plant ${id} is sad... :(`)
      },
      uploadNewPhoto(id) {
        alert('TODO: Implement a dialog box for photo upload' + id)
      },
    },
  }
</script>

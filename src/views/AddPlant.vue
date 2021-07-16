<template>
  <v-container>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <h1 class="ma-2">Add a Plant</h1>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="Name"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-select
            v-model="selectedLocation"
            :items="locations"
            :rules="[(v) => !!v || 'Location is required']"
            label="Location"
            required
          ></v-select>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="imageUrl"
            label="Image URL"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-file-input
            label="File input"
            accept="image/png, image/jpeg, image/bmp"
            filled
            prepend-icon="mdi-camera"
            @change="onFileChange"
          ></v-file-input>
        </v-col>
        <v-col cols="8" offset="3">
          <img :src="this.imageUrl" alt="plant preview" width="80%">
        </v-col>
      </v-row>
      <v-row >
        <v-col cols="6" md="2" align="center"> 
          <v-btn color="error" class="mr-4" @click="cancel"> Cancel </v-btn>
        </v-col>
        <v-col cols="6" md="2" align="center">
          <v-btn color="success" @click="submit"> Submit Form </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    name: "",
    imageUrl: "",
    selectedLocation: null,
    nameRules: [
      (v) => !!v || "Name is required",
      // v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    locations: ["INSIDE", "FRONT", "BACK"],
  }),

  methods: {
    reset() {
      this.$refs.form.reset();
    },
    cancel() {
      this.$router.push("/");
    },
    submit() {
      const new_plant = {
        name: this.name,
        latest_pic: this.imageUrl,
        location: this.selectedLocation,
      };
      this.$store.dispatch("addPlant", new_plant);
      this.$router.push("/");
    },
    onFileChange(e) {
      this.imageUrl = URL.createObjectURL(e);
    }
  },
};
</script>
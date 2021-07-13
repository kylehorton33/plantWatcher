<template>
  <v-container>
    <v-col cols=12>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          v-model="name"
          :rules="nameRules"
          label="Name"
          required
        ></v-text-field>
        
        <v-text-field
          v-model="imageUrl"
          label="Image URL"
          required
        ></v-text-field>

        <v-select
          v-model="selectedLocation"
          :items="locations"
          :rules="[v => !!v || 'Location is required']"
          label="Location"
          required
        ></v-select>

        <v-btn
          color="error"
          class="mr-4"
          @click="reset"
        >
          Reset Form
        </v-btn>

        <v-btn
          color="success"
          @click="submit"
        >
          Submit Form
        </v-btn>
      </v-form>
    </v-col>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      valid: true,
      name: '',
      imageUrl: '',
      selectedLocation: null,
      nameRules: [
        v => !!v || 'Name is required',
        // v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      locations: [
        'INSIDE',
        'FRONT',
        'BACK',
      ],
    }),

    methods: {
      reset () {
        this.$refs.form.reset()
      },
      submit () {
        const new_plant = {
          name: this.name,
          latest_pic: this.imageUrl,
          location: this.selectedLocation,
        }
        this.$store.dispatch('createPlant', new_plant)
        this.$router.push('/')
      }
    },
  }
</script>
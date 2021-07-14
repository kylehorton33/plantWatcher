<template>
  <v-row class="pb-4">
      <v-col align="center">
          <SunIcon />
      </v-col>
      <v-col align="center">
          <WaterIcon />
      </v-col>
  </v-row>
</template>

<script>
import SunIcon from './SunIcon.vue'
import WaterIcon from './WaterIcon.vue'

export default {
    components: {
        SunIcon, WaterIcon
    }

}
</script>

<style>

</style>
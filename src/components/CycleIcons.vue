<template>
  <v-row>
      <v-col align="center">
          <SunIcon />
      </v-col>
      <v-col align="center">
          <WaterIcon />
      </v-col>
      <v-col align="center">
          <CalendarIcon />
      </v-col>
  </v-row>
</template>

<script>
import SunIcon from './SunIcon.vue'
import WaterIcon from './WaterIcon.vue'
import CalendarIcon from './CalendarIcon.vue'

export default {
    components: {
        SunIcon, WaterIcon, CalendarIcon
    }

}
</script>

<style>

</style>
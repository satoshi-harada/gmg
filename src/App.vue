<template>
  <v-app>
    <v-tabs centered color="cyan" dark icons-and-text>
      <v-tabs-slider color="yellow"></v-tabs-slider>
      <v-tab to="/commit-message">
        Commit Message
        <v-icon>message</v-icon>
      </v-tab>
      <!-- <v-tab to="/branch-name">
        Branch Name
        <v-icon>call_split</v-icon>
      </v-tab> -->
      <v-tab to="/setting">
        Setting
        <v-icon>settings</v-icon>
      </v-tab>
    </v-tabs>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      //
    }
  }
}
</script>

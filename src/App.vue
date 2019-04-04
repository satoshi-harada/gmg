<template>
  <v-app>
    <v-toolbar app dark color="primary">
      <v-toolbar-title class="headline text-uppercase">
        <span>Git Message Generator</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat icon>
        <v-icon>settings</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
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

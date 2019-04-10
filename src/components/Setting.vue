<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <v-card flat color="blue-grey lighten-3" class="white--text">
          <v-card-title>
            <span class="headline"><v-icon medium color="white">message</v-icon> COMMIT MESSAGE</span>
          </v-card-title>
          <v-container
            fluid
            grid-list-lg
          >
            <v-layout row wrap>
              <v-flex xs12 v-for="deleteTarget of deleteTargets" v-bind:key="deleteTarget.targetSelectName">
                <select-items-delete
                  :targetSelectItemsName="deleteTarget.targetSelectName"
                  :lsKeyName="deleteTarget.targetLsKeyName"
                />
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import SelectItemsDelete from './SelectItemsDelete.vue'
  export default {
    data: () => ({
      deleteTargets: [
        {
          targetSelectName: "アプリケーションの名前",
          targetLsKeyName: "app_name_items"
        },
        {
          targetSelectName: "機能の名前",
          targetLsKeyName: "func_name_items"
        }
      ]
    }),
    components: {
      'select-items-delete': SelectItemsDelete,
    }
  }
</script>

<style>
</style>

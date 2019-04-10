<template>
  <v-card>
    <v-card-title>
      <span class="title">{{ targetSelectItemsName }}を削除</span>
    </v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-select
        v-model="deleteItems"
        :items="targetItems"
        label="削除対象を選択"
        no-data-text="データがありません"
        chips
        multiple
        ></v-select>
      </v-form>    
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn 
        :loading="doing"
        :disabled="doing"
        color="secondary" 
        @click="loader= 'doing'"
      >
        delete
        <template v-slot:loader>
        <span>deleted!</span>
        </template>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    props: ['targetSelectItemsName', 'lsKeyName'],
    data: () => ({
      deleteItems: null,
      targetItems: null,
      loader: null,
      doing: false,
    }),
    mounted() {
      this.targetItems = this.getLocalStorage(this.lsKeyName)
    },
    methods: {
      deleteItem () {
        if (this.deleteItems) {
          this.deleteItems.forEach(function (appName) {
            this.targetItems.splice(this.targetItems.indexOf(appName), 1)
            this.deleteItems = null
            this.setLocalStorage(this.lsKeyName, this.targetItems)
          }.bind(this))
        }
      },
      getLocalStorage(lsKeyName) {
        if (localStorage.getItem(lsKeyName)) {
          try {
            return JSON.parse(localStorage.getItem(lsKeyName))
          } catch(e) {
            localStorage.removeItem(lsKeyName)
          }
        }
      },
      setLocalStorage(lsKeyName, targetObject) {
        localStorage.setItem(lsKeyName, JSON.stringify(targetObject))
      }
    },
    watch: {
      loader () {
        this.deleteItem()
        // loader
        const l = this.loader
        this[l] = !this[l]
        setTimeout(() => (this[l] = false), 3000)
        this.loader = null
      }
    },
  }
</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
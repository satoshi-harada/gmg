<template>
  <v-layout text-lg-left wrap>
    <v-flex xs12>
      <v-card>
        <v-card-title primary-title>
          <div class="title" id="message" style="white-space: pre-line;">{{generatedText}}</div>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn 
            :loading="doing"
            :disabled="doing || !valid"
            color="primary" 
            @click="loader= 'doing'"
          >
            copy
            <template v-slot:loader>
              <span>copied!</span>
            </template>
          </v-btn>
          <v-btn color="secondary" @click="childReset">reset</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    props: ['generatedText', 'valid'],
    data: () => ({
      loader: null,
      doing: false,
    }),
    methods: {
      childReset () {
        this.$emit('childReset')
      },
    },
    watch: {
      loader () {
        // commit message copy
        const element = document.querySelector('#message');
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
        const succeeded = document.execCommand('copy');
        if (succeeded) {
            console.log('コピーが成功しました！');
        } else {
            console.log('コピーが失敗しました!');
        }
        selection.removeAllRanges();
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
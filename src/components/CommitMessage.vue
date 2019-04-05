<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="appName"
            :rules="[v => !!v || 'アプリケーションの名前を指定してください。']"
            label="アプリケーションの名前"
            required
          ></v-text-field>

          <v-text-field
            v-model="funcName"
            :rules="[v => !!v || '機能の名前を指定してください。']"
            label="機能の名前"
            required
          ></v-text-field>

          <v-select
            v-model="commitType"
            :items="commitTypeItems"
            :rules="[v => !!v || 'コミットの種類を指定してください。']"
            label="コミットの種類"
            required
          ></v-select>

          <v-text-field
            v-model="messageHeader"
            :rules="[v => !!v || 'メッセージヘッダーを指定してください。']"
            label="メッセージヘッダー"
            required
          ></v-text-field>
          
          <v-textarea
            v-model="messageBody"
            label="コミット内容の補足"
          >
          </v-textarea>
        </v-form>
      </v-flex>
    </v-layout>

    <v-layout text-lg-left wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <div>
              <div class="title" id="message" style="white-space: pre-line;">{{
                  (!appName ? "" : "[" + appName + "] ") +
                  (!funcName ? "" : "[" + funcName + "] ") +
                  (!commitType ? "" : "[" + commitType + "] ") +
                  (!messageHeader ? "" : messageHeader) + 
                  '\n' + 
                  '\n' +
                  (!messageBody ? "" : messageBody)}}</div>
            </div>
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
            <v-btn color="secondary" @click="reset">reset</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
  export default {
    data: () => ({
      valid: true,
      appName: '',
      funcName: '',
      commitType: '',
      commitTypeItems: [
        'Test Coding',
        'Product Coding',
        'Refactoring'
      ],
      messageHeader: '',
      messageBody: '',
      loader: null,
      doing: false,
    }),
    computed: {

    },
    methods: {
      reset () {
        this.$refs.form.reset()
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
    }
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

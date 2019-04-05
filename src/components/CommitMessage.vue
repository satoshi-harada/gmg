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
    <!-- GenerateText Component -->
    <generated-text 
      :generatedText="commitMessage"
      :valid="valid"
      @childReset="reset"
    />
  </v-container>
</template>

<script>
  import GeneratedText from './GeneratedText.vue'
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
    }),
    computed: {
      commitMessage: function() {
        return (!this.appName ? "" : "[" + this.appName + "] ") +
        (!this.funcName ? "" : "[" + this.funcName + "] ") +
        (!this.commitType ? "" : "[" + this.commitType + "] ") +
        (!this.messageHeader ? "" : this.messageHeader) + 
        '\n' + 
        '\n' +
        (!this.messageBody ? "" : this.messageBody)
      }
    },
    methods: {
      reset () {
        this.$refs.form.reset()
      },
    },
    components: {
      'generated-text': GeneratedText,
    }
  }
</script>

<style>
</style>

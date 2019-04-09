<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <v-form ref="form" v-model="valid" lazy-validation>
          <!-- アプリケーションの名前 -->
          <v-combobox
            v-model="appName"
            :items="appNameItems"
            :rules="[v => !!v || 'アプリケーションの名前を指定してください。']"
            prepend-icon="edit"
            label="アプリケーションの名前"
            required
            @change="onChangeAppName($event)"
          ></v-combobox>
          <!-- 機能の名前 -->
          <v-combobox
            v-model="funcName"
            :items="funcNameItems"
            :rules="[v => !!v || '機能の名前を指定してください。']"
            prepend-icon="edit"
            label="機能の名前"
            required
            @change="onChangeFuncName($event)"
          ></v-combobox>
          <!-- コミットの種類 -->
          <v-select
            v-model="commitType"
            :items="commitTypeItems"
            :rules="[v => !!v || 'コミットの種類を指定してください。']"
            prepend-icon="edit"
            label="コミットの種類"
            required
          ></v-select>
          <!-- コミットの概要 -->
          <v-text-field
            v-model="messageHeader"
            :rules="[v => !!v || 'コミットの概要を指定してください。']"
            prepend-icon="edit"
            label="コミットの概要"
            required
          ></v-text-field>
          <!-- コミットの詳細 -->
          <v-textarea
            v-model="messageBody"
            prepend-icon="edit"
            label="コミットの詳細"
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
      appNameItems: [],
      funcName: '',
      funcNameItems: [],
      commitType: '',
      commitTypeItems: [
        'TestCode Coding',
        'ProductCode Coding',
        'Refactoring',
        'Trial Coding'
      ],
      messageHeader: '',
      messageBody: '',
    }),
    mounted() {
      // set appNameItems
      if (localStorage.getItem('app_name_items')) {
        try {
          this.appNameItems = JSON.parse(localStorage.getItem('app_name_items'))
        } catch(e) {
          localStorage.removeItem('app_name_items')
        }
      }
      // set funcNameItems
      if (localStorage.getItem('func_name_items')) {
        try {
          this.funcNameItems = JSON.parse(localStorage.getItem('func_name_items'))
        } catch(e) {
          localStorage.removeItem('func_name_items')
        }
      }
    },
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
      onChangeAppName(event) {
        if (this.appNameItems.indexOf(event) === -1 && event != null) {
          this.appNameItems.push(event)
          localStorage.setItem('app_name_items', JSON.stringify(this.appNameItems))
        }
      },
      onChangeFuncName(event) {
        if (this.funcNameItems.indexOf(event) === -1 && event != null) {
          this.funcNameItems.push(event)
          localStorage.setItem('func_name_items', JSON.stringify(this.funcNameItems))
        }
      },
    },
    components: {
      'generated-text': GeneratedText,
    }
  }
</script>

<style>
</style>

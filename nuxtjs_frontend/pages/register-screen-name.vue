<template>
  <div class="register-screen-name">
    <v-form ref="registerScreenName">
      <v-container>
        <v-row style="max-width: 500px" class="mx-auto text-center my-4">
          <v-col cols="12">
            <p class="text-h4 font-weight-bold my-4">ユーザIDを設定</p>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="screenName"
              :rules="[rules.required, rules.screenName]"
              :error="errors.screen_name"
              :error-messages="messages.screen_name"
              :counter="15"
              label="ユーザID"
              prepend-icon="mdi-account-circle"
              hint="4文字以上15文字以下"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-btn
              elevation="2"
              class="px-10"
              color="success"
              rounded
              large
              block
              style="font-size: 1.2rem"
              @click="registerScreenName"
              >設定する</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "RegisterScreenNamePage",
  layout: "beforeLogin",
  middleware: ["isauth"],
  mounted() {
    //バリデーションリセット
    this.$refs.registerScreenName.resetValidation();
  },
  data: () => ({
    screenName: "",
    //バリデーション
    rules: {
      required: (value) => !!value || "入力必須",
      screenName: (value) =>
        /^.{4,15}$/.test(value) || "4文字以上15文字以下で入力してください",
    },
  }),
  computed: {
    errors() {
      return this.$store.getters["errors"];
    },
    messages() {
      return this.$store.getters["messages"];
    },
  },
  methods: {
    registerScreenName() {
      if (this.$refs.registerScreenName.validate()) {
        this.$store.dispatch("registerScreenName", {
          screenName: this.screenName,
        });
      }
    },
  },
};
</script>

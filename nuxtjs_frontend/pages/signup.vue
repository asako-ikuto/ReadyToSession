<template>
  <div class="signup">
    <v-form ref="signup">
      <v-container>
        <v-row class="text-center">
          <v-col class="my-6">
            <p class="text-h4 font-weight-bold mb-6">新規登録</p>
          </v-col>
        </v-row>
        <v-row style="max-width: 500px" class="mx-auto">
          <v-col cols="12">
            <v-text-field
              v-model="name"
              :rules="[rules.required, rules.name]"
              :error="errors.name"
              :error-messages="messages.name"
              :counter="50"
              label="ユーザ名"
              prepend-icon="mdi-badge-account-horizontal-outline"
              required
            ></v-text-field>
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
            <v-text-field
              v-model="email"
              :rules="[rules.required, rules.email]"
              :error="errors.email"
              :error-messages="messages.email"
              label="Email"
              prepend-icon="mdi-mail"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="password"
              :rules="[rules.required, rules.password]"
              :error="errors.password"
              :error-messages="messages.password"
              prepend-icon="mdi-lock"
              :append-icon="isShowPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="isShowPassword ? 'text' : 'password'"
              @click:append="isShowPassword = !isShowPassword"
              hint="8文字以上24文字以下"
              label="Password"
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
              @click="registerUser"
              >登録する</v-btn
            >
          </v-col>
          <v-col cols="12" class="text-right">
            <router-link to="/login"
              >既にアカウントをお持ちの方はこちらから</router-link
            >
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "SignupPage",
  layout: "beforeLogin",
  auth: false,
  mounted() {
    //バリデーションリセット
    this.$refs.signup.resetValidation();
  },
  data: () => ({
    name: "",
    screenName: "",
    email: "",
    password: "",
    //バリデーション
    rules: {
      required: (value) => !!value || "入力必須",
      name: (value) => (value && value.length <= 50) || "最大50文字までです",
      screenName: (value) =>
        /^.{4,15}$/.test(value) || "4文字以上15文字以下で入力してください",
      email: (value) =>
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          value
        ) || "",
      password: (value) => /^[a-zA-Z0-9.?\/-]{8,24}$/.test(value) || "",
    },
    //パスワード表示
    isShowPassword: false,
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
    registerUser() {
      if (this.$refs.signup.validate()) {
        this.$store.dispatch("registerUser", {
          name: this.name,
          screenName: this.screenName,
          email: this.email,
          password: this.password,
        });
      }
    },
  },
};
</script>

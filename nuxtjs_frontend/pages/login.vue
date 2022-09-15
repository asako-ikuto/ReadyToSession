<template>
  <div class="login">
    <v-form ref="login">
      <v-container>
        <v-row class="text-center">
          <v-col class="my-6">
            <p class="text-h4 font-weight-bold mb-6">ログイン</p>
          </v-col>
        </v-row>
        <v-row style="max-width: 500px" class="mx-auto">
          <v-col cols="12">
            <v-text-field
              v-model="email"
              :rules="[rules.required]"
              label="Email"
              prepend-icon="mdi-mail"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="password"
              :rules="[rules.required]"
              prepend-icon="mdi-lock"
              :append-icon="isShowPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="isShowPassword ? 'text' : 'password'"
              @click:append="isShowPassword = !isShowPassword"
              label="Password"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-alert v-if="isError" dense outlined type="error">{{
              loginError
            }}</v-alert>
            <v-btn
              elevation="2"
              class="px-10"
              color="success"
              rounded
              large
              block
              style="font-size: 1.2rem"
              @click="login"
              >ログイン</v-btn
            >
          </v-col>
          <v-col cols="12" class="text-right">
            <router-link to="/signup">新規登録はこちらから</router-link>
          </v-col>

          <v-col cols="12"
            ><v-btn
              elevation="2"
              class="px-10"
              color="cyan"
              rounded
              dark
              large
              block
              style="font-size: 1.2rem; text-transform: none"
              @click="twitterLogin"
              ><v-icon left dark> mdi-twitter </v-icon>Twitterログイン</v-btn
            ></v-col
          >
          <v-col cols="12"
            ><v-btn
              elevation="2"
              class="px-10"
              color="error"
              rounded
              large
              block
              @click="googleLogin"
              style="font-size: 1.2rem; text-transform: none"
              ><v-icon left dark> mdi-google </v-icon>Googleログイン</v-btn
            ></v-col
          >
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  layout: "beforeLogin",
  auth: false,
  mounted() {
    //バリデーションリセット
    this.$refs.login.resetValidation();
  },
  data: () => ({
    email: "",
    password: "",
    //バリデーション
    rules: {
      required: (value) => !!value || "入力必須",
    },
    //パスワード表示
    isShowPassword: false,
  }),
  computed: {
    isError() {
      return this.$store.getters["isError"];
    },
    loginError() {
      return this.$store.getters["loginError"];
    },
  },
  methods: {
    login() {
      if (this.$refs.login.validate()) {
        this.$store.dispatch("login", {
          email: this.email,
          password: this.password,
        });
      }
    },
    twitterLogin() {
      this.$store.dispatch("twitterLogin");
    },
    googleLogin() {
      this.$store.dispatch("googleLogin");
    },
  },
};
</script>

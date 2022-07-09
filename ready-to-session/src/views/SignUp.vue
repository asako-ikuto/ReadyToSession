<template>
  <div class="signup">
    <!--header-->
    <Header>
      <!-- <router-link to="/" class="text-decoration-none">
        <div class="d-flex align-center">
          <v-img :src="require('../assets/logo.svg')" 
                  alt="ReadyToSession Logo"
                  class="shrink mr-4"
                  contain
                  transition="scale-transition"
                  width="40"></v-img>
          <v-img :src="require('../assets/logo_name.png')"
                  alt="ReadyToSession"
                  class="shrink mt-1"
                  contain
                  min-width="200"
                  transition="scale-transition"
                  width="200"></v-img>
          
        </div>
      </router-link>  -->
    </Header>
    <!-- <v-app-bar
      app
      color="success"
      class="hidden-sm-and-down"
      dark
    >
      <router-link to="/" class="text-decoration-none">
        <div class="d-flex align-center">
          <v-img :src="require('../assets/logo.svg')" 
                  alt="ReadyToSession Logo"
                  class="shrink mr-4"
                  contain
                  transition="scale-transition"
                  width="40"></v-img>
          <v-img :src="require('../assets/logo_name.png')"
                  alt="ReadyToSession"
                  class="shrink mt-1"
                  contain
                  min-width="200"
                  transition="scale-transition"
                  width="200"></v-img>
        </div>
      </router-link>

      <v-spacer></v-spacer>

      <router-link to="/signup" class="text-decoration-none">
        <v-btn
        text
      >
          <span class="mr-2 text-subtitle-1">登録する</span>
        </v-btn>
      </router-link>

      <router-link to="/login" class="text-decoration-none">
        <v-btn
        text
      >
          <span class="mr-2 text-subtitle-1">ログイン</span>
        </v-btn>
      </router-link>     
    </v-app-bar> -->
    <!--main-->
    <v-form v-model="valid">
      <v-container>
        <v-row class="text-center">
          <v-col class="my-6">
            <p class="text-h3 mb-6">
              新規登録
            </p>
          </v-col>
        </v-row>
        <v-row style="max-width:500px" class="mx-auto">
          <v-col
            cols="12"
          >
            <v-text-field
              v-model="username"
              :rules="nameRules"
              :counter="10"
              label="表示名"
              prepend-icon="mdi-badge-account-horizontal-outline"
              required
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
          >
            <v-text-field
              v-model="userId"
              :rules="nameRules"
              :counter="10"
              label="ユーザID"
              prepend-icon="mdi-account-circle"
              required
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
          >
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Email"
              prepend-icon="mdi-mail"
              required
            ></v-text-field>
          </v-col>
          <v-col
            class="mb-10"
            cols="12"
          >
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              prepend-icon="mdi-lock"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              hint="最小8文字"
              label="Password"
              required
            ></v-text-field>
          </v-col>
          <v-col
          cols="12"
        >
            <router-link to="/send-email" class="text-decoration-none">
              <v-btn elevation="2" class="px-10" color="success" rounded large block style="font-size:1.2rem;">認証メールを送信する</v-btn>
            </router-link>
          </v-col>
          <v-col
          cols="12" class="text-right"
        >
            <router-link to="/login">既にアカウントをお持ちの方はこちらから</router-link>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import Header from "../components/Header";

export default {
  name: 'SignUp',
  components: {
    Header
  },

  // data: () => ({
  //   logo_image: require("../assets/logo.svg"),
  //   logo_name: require("../assets/logo_name.png"),
  // }),
};
</script>

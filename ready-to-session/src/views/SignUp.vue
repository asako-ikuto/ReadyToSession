<template>
  <div class="signup">
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
            <v-row justify="center" class="px-2">
              <v-btn elevation="2" class="px-10" color="success" rounded large block style="font-size:1.2rem;">認証メールを送信する</v-btn>
            </v-row>
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

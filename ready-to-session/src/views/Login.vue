<template>
  <div class="login">
    <v-form v-model="valid">
    <v-container>
      <v-row class="text-center">
        <v-col class="my-6">
          <p class="text-h3 mb-6">
            ログイン
          </p>
        </v-col>
      </v-row>
      <v-row style="max-width:500px" class="mx-auto">
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
          <router-link to="/login" class="text-decoration-none">
            <v-row justify="center" class="px-2">
              <v-btn elevation="2" class="px-10" color="success" rounded large block style="font-size:1.2rem;">ログイン</v-btn>
            </v-row>
          </router-link>
        </v-col>
        <v-col
        cols="12" class="text-right"
      >
          <router-link to="/signup">新規登録はこちらから</router-link>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
  </div>
</template>

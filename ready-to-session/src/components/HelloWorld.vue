<template>
  <v-container>
    <!--header-->
    <v-app-bar
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
    </v-app-bar>
    <!--sp表示-->
    <v-row class="text-center hidden-md-and-up">
      <v-col class="my-2">
        <h1 class="display-2 font-weight-bold mb-6">
          Ready to Session
        </h1>
        <h2 class="headline">
          演奏できる曲リストを作ってシェアしよう
        </h2>
      </v-col>
      <v-col cols="12">
        <v-img
          :src="require('../assets/main_image.jpg')"
          class="mb-3"
          contain
          height="300"
        />
      </v-col>
      <v-col
        class="mb-5"
        cols="12"
      >
        <router-link to="/login" class="text-decoration-none">
          <v-btn elevation="2" class="px-10" color="success" rounded large block style="font-size:1.2rem;">始める</v-btn>
        </router-link>
      </v-col>
    </v-row>
    <!--PC表示-->
    <v-row class="text-center hidden-sm-and-down"> 
      <v-col cols="6" class="mt-10 mx-0">
        <v-img
          :src="require('../assets/main_image.jpg')"
          class="mb-3"
          contain
          height="300"
        />
      </v-col>
      <v-col class="mt-16 mb-6 mx-0" cols="6">
        <h1 class="display-2 font-weight-bold mb-10">
          Ready to Session
        </h1>
        <h2 class="headline mb-10">
          演奏できる曲リストを作ってシェアしよう
        </h2>
        <router-link to="/login" class="text-decoration-none">
          <v-btn elevation="2" class="px-10" color="success" rounded large block style="font-size:1.2rem;">始める</v-btn>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data: () => ({
    }),
  }
</script>

<template>
  <v-container>
    <!--header-->
    <Header>
      <router-link to="/" class="text-decoration-none">
        <div class="d-flex align-center">
          <v-img :src="logo" 
                  alt="ReadyToSession Logo"
                  class="shrink mr-4"
                  contain
                  transition="scale-transition"
                  width="40"></v-img>
          <v-img :src="logo_name"
                  alt="ReadyToSession"
                  class="shrink mt-1"
                  contain
                  min-width="200"
                  transition="scale-transition"
                  width="200"></v-img>
        </div>
      </router-link> 
    </Header>
    <!--sp表示content-->
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
          :src="main_image"
          class="mb-3"
          contain
          height="300"
        />
      </v-col>
      <v-col
        class="mb-5"
        cols="12"
      >
        <v-btn elevation="2" 
               class="px-10" 
               color="success" 
               rounded large block 
               style="font-size:1.2rem;" 
               to="/login">始める</v-btn>
      </v-col>
    </v-row>
    <!--PC表示content-->
    <v-row class="text-center hidden-sm-and-down"> 
      <v-col cols="6" class="mt-10 mx-0">
        <v-img
          :src="main_image"
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
        <h2 class="headline mb-10">
          {{ message }}
        </h2>
        <v-btn elevation="2" 
               class="px-10" 
               color="success" 
               rounded large block 
               style="font-size:1.2rem;" 
               to="/login">始める</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Header from "../components/Header";
import axios from 'axios'

  export default {
    name: 'HelloWorld',
    components: {
      Header
    },
    data: () => ({
      logo: require("../assets/logo.svg"),
      logo_name: require("../assets/logo_name.png"),
      main_image: require('../assets/main_image.jpg'),
      message: '',
    }),
    created() {
      this.hello();
    },
    methods: {
      async hello() {
        const res = await axios.get('api/hello');
        this.message = res.data;
      }
    }
  }
</script>

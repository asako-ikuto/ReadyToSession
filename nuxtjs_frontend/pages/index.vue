<template>
  <div class="index">
    <v-container>
      <!--sp表示-->
      <v-row class="text-center hidden-md-and-up">
        <v-col class="my-2">
          <h1 class="display-2 font-weight-bold mb-6">Ready to Session</h1>
          <h2 class="headline">演奏できる曲リストを作ってシェアしよう</h2>
        </v-col>
        <v-col cols="12">
          <v-img :src="main_image" class="mb-3" contain height="300" />
        </v-col>
        <v-col class="mb-5" cols="12">
          <v-btn
            elevation="2"
            class="px-10"
            color="success"
            rounded
            large
            block
            style="font-size: 1.2rem"
            to="/login"
            >始める</v-btn
          >
        </v-col>
      </v-row>
      <!--PC表示-->
      <v-row class="text-center hidden-sm-and-down">
        <v-col cols="6" class="mt-10 mx-0">
          <v-img :src="main_image" class="mb-3" contain height="300" />
        </v-col>
        <v-col class="mt-16 mb-6 mx-0" cols="6">
          <h1 class="display-2 font-weight-bold mb-10">Ready to Session</h1>
          <h2 class="headline mb-10">演奏できる曲リストを作ってシェアしよう</h2>
          <v-btn
            elevation="2"
            class="px-10"
            color="success"
            rounded
            large
            block
            style="font-size: 1.2rem"
            to="/login"
            >始める</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  layout: "beforeLogin",
  auth: false,
  data: () => ({
    main_image: "/main_image.jpg",
  }),
};
</script>

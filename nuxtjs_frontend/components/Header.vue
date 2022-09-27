<template>
  <div class="header">
    <v-app-bar app color="success" class="hidden-sm-and-down" dark>
      <slot></slot>
      <router-link to="/" class="text-decoration-none">
        <div class="d-flex align-center">
          <v-img
            :src="logo_name"
            alt="ReadyToSession"
            class="shrink mt-1"
            contain
            min-width="200"
            transition="scale-transition"
            width="200"
          ></v-img>
        </div>
      </router-link>
      <v-spacer></v-spacer>
      <router-link to="/signup" class="text-decoration-none">
        <v-btn text>
          <span class="mr-2 text-subtitle-1">登録する</span>
        </v-btn>
      </router-link>
      <router-link to="/login" class="text-decoration-none">
        <v-btn text>
          <span class="mr-2 text-subtitle-1">ログイン</span>
        </v-btn>
      </router-link>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      logo_name: "/logo_name.png",
    };
  },
};
</script>

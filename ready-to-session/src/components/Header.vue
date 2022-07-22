<template>
  <div class="header">
    <v-app-bar
        app
        color="success"
        class="hidden-sm-and-down"
        dark
      >
        <slot></slot>
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
  </div>
</template>

<script>
export default {
  name: 'Header',
};
</script>

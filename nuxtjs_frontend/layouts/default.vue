<template>
  <v-app id="app">
    <v-main>
      <sidebar></sidebar>
      <bottom-nav></bottom-nav>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from "~/components/Sidebar.vue";
import BottoNav from "~/components/BottomNav.vue";

export default {
  name: "DefaultLayout",
  data() {
    return {};
  },
};
</script>

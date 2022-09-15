<template>
  <v-app id="app">
    <v-main>
      <sidebar-admin></sidebar-admin>
      <bottom-nav-admin></bottom-nav-admin>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import SidebarAdmin from "~/components/SidebarAdmin.vue";
import BottomNavAdmin from "~/components/BottomNavAdmin.vue";

export default {
  name: "AdminDefaultLayout",
  data() {
    return {};
  },
};
</script>

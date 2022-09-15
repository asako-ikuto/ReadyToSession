<template>
  <div class="sidebar-admin">
    <v-navigation-drawer
      app
      mobile-breakpoint="960"
      class="text-light"
      color="success"
      dark
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            <router-link to="/home" class="text-decoration-none">
              <v-img
                :src="logo_name"
                alt="ReadyToSession"
                class="shrink my-4 mx-1"
                contain
                min-width="200"
                transition="scale-transition"
                width="200"
              ></v-img>
            </router-link>
          </v-list-item-title>
          <v-divider></v-divider>
        </v-list-item-content>
      </v-list-item>
      <v-list nav>
        <v-list-item
          v-for="nav_list in nav_lists"
          :key="nav_list.name"
          :to="nav_list.link"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ nav_list.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ nav_list.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list-item @click="logout">
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>ログアウト</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "SidebarAdmin",
  data: () => ({
    logo_name: "/logo_name.png",
    nav_lists: [
      { name: "曲管理", icon: "mdi-playlist-music", link: "/songlist" },
      {
        name: "アーティスト管理",
        icon: "mdi-account-details",
        link: "/artistlist",
      },
    ],
  }),
  methods: {
    async logout() {
      try {
        const response = await this.$auth.logout().then((res) => {
          this.$router.push("/login");
          console.log(res);
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

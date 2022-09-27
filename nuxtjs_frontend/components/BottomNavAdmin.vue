<template>
  <div class="bottom-nav-admin">
    <v-row class="text-left hidden-md-and-up">
      <template>
        <v-bottom-navigation color="success" grow style="bottom: 0px" fixed>
          <v-btn to="/songlist">
            <span>曲管理</span>
            <v-icon>mdi-playlist-music</v-icon>
          </v-btn>
          <v-btn to="/artistlist">
            <span>アーティスト管理</span>
            <v-icon>mdi-account-details</v-icon>
          </v-btn>
          <v-btn @click="logout">
            <span>ログアウト</span>
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </v-bottom-navigation>
      </template>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "BottomNavAdmin",
  data() {
    return {};
  },
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

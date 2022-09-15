<template>
  <div class="bottom-nav">
    <v-row class="text-left hidden-md-and-up">
      <template>
        <v-bottom-navigation color="success" grow style="bottom: 0px" fixed>
          <v-btn to="/home">
            <span>演奏できる曲</span>
            <v-icon>mdi-playlist-music</v-icon>
          </v-btn>
          <v-btn to="/userlist">
            <span>ユーザを探す</span>
            <v-icon>mdi-account-search</v-icon>
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
  name: "BottomNav",
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

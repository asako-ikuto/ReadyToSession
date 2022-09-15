<template>
  <div class="login">
    <v-form ref="login">
      <v-container>
        <v-row class="text-center">
          <v-col class="my-6">
            <p class="text-h4 font-weight-bold mb-6">管理画面</p>
          </v-col>
        </v-row>
        <v-row style="max-width: 500px" class="mx-auto">
          <v-col cols="12">
            <v-btn
              elevation="2"
              class="px-10"
              color="success"
              rounded
              large
              block
              style="font-size: 1.2rem"
              to="/songlist"
              >曲管理</v-btn
            >
          </v-col>
          <v-col cols="12">
            <v-btn
              elevation="2"
              class="px-10"
              color="success"
              rounded
              large
              block
              style="font-size: 1.2rem"
              to="/artistlist"
              >アーティスト管理</v-btn
            >
          </v-col>
          <v-col cols="12">
            <v-btn
              elevation="2"
              class="px-10"
              color="success"
              rounded
              large
              block
              style="font-size: 1.2rem"
              @click="logout"
              >ログアウト</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  layout: "beforeLogin",
  middleware: ["admin", "auth"],
  data: () => ({}),
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

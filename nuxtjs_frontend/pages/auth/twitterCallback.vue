<template>
  <div class="twitter-callback">認証中</div>
</template>

<script>
export default {
  name: "TwitterCallbackPage",
  layout: "beforeLogin",
  // auth: false,
  async mounted() {
    // dispatch("googleLoginCallback", { param: this.$route.query });
    console.log(this.$route.query);

    try {
      const response = await this.$axios
        .$get("login/twitter/callback", {
          params: this.$route.query,
        })
        .then((res) => {
          console.log(res);
          this.$router.replace("/test");
        });

      console.log(response);
      // this.$store.commit("setToken", { token: response.access_token });
      // this.$store.commit("setUser", { user: response.user });
    } catch (error) {
      console.log(error);
    }
  },
  data: () => ({}),
  computed: {},
  methods: {},
};
</script>

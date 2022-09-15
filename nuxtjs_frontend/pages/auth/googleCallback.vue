<template>
  <div class="google-callback">認証中</div>
</template>

<script>
export default {
  name: "GoogleCallbackPage",
  layout: "beforeLogin",
  // auth: false,
  mounted() {
    this.$store.dispatch("googleLoginCallback", { params: this.$route.query });
  },
  data: () => ({}),
  computed: {},
  methods: {},
};
</script>

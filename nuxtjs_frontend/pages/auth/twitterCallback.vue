<template>
  <div class="twitter-callback"></div>
</template>

<script>
export default {
  name: "TwitterCallbackPage",
  layout: "beforeLogin",
  auth: false,
  async mounted() {
    this.$store.dispatch("twitterLoginCallback", { params: this.$route.query });
  },
  data: () => ({}),
  computed: {},
  methods: {},
};
</script>

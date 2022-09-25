export const state = () => ({
  //エラーメッセージ
  errors: {
    name: false,
    screen_name: false,
    email: false,
    password: false,
  },
  messages: {
    name: null,
    screen_name: null,
    email: null,
    password: null,
  },
  isError: false,
  loginError: "",
});

export const getters = {
  errors: (state) => state.errors,
  messages: (state) => state.messages,
  isError: (state) => state.isError,
  loginError: (state) => state.loginError,
};

export const mutations = {
  clearErrors(state) {
    Object.keys(state.errors).forEach((key) => {
      state.errors[key] = false;
      state.messages[key] = null;
    });
  },
  setErrors(state, payload) {
    Object.keys(state.errors).forEach((key) => {
      state.errors[key] = true;
      state.messages[key] = payload.errors[key];
    });
  },
  setLoginError(state, data) {
    state.isError = true;
    state.loginError = data;
  },
  resetLoginError(state) {
    state.isError = false;
    state.loginError = "";
  },
};

export const actions = {
  async login({ commit }, payload) {
    try {
      const response = await this.$auth
        .loginWith("laravelApi", {
          data: {
            email: payload.email,
            password: payload.password,
          },
        })
        .then((res) => {
          if (this.$auth.user.admin_flag == 1) {
            this.$router.push("/admin-home");
          } else if (this.$auth.user.admin_flag == 0) {
            this.$router.push("/home");
          }
          commit("resetLoginError");
        });
    } catch (error) {
      console.log(error);
      const loginErrorMessage = "ログインに失敗しました";
      commit("setLoginError", loginErrorMessage);
    }
  },
  async registerUser({ commit }, payload) {
    try {
      await this.$axios.$get("/sanctum/csrf-cookie").then(async (res) => {
        const response = await this.$axios
          .$post("/register", {
            name: payload.name,
            screen_name: payload.screenName,
            email: payload.email,
            password: payload.password,
          })
          .then(async (res) => {
            if (res.status == 400) {
              commit("setErrors", {
                errors: res.errors,
              });
            } else {
              commit("clearErrors");
              await this.$auth
                .loginWith("laravelApi", {
                  data: {
                    email: payload.email,
                    password: payload.password,
                  },
                })
                .then((res) => {
                  this.$router.push("/home");
                });
            }
          });
      });
    } catch (error) {
      console.log(error);
    }
  },
  async registerScreenName({ commit }, payload) {
    try {
      await this.$axios.$get("/sanctum/csrf-cookie").then(async (res) => {
        const response = await this.$axios
          .$post("/register-screen-name", {
            screen_name: payload.screenName,
          })
          .then(async (res) => {
            if (res.status == 400) {
              commit("setErrors", {
                errors: res.errors,
              });
            } else {
              commit("clearErrors");
              this.$router.push("/home");
            }
          });
      });
    } catch (error) {
      console.log(error);
    }
  },
  async twitterLogin() {
    try {
      await this.$axios.$get("/sanctum/csrf-cookie").then(async (res) => {
        const response = await this.$axios.$get("/login/twitter");
        window.location.href = response;
      });
    } catch (error) {
      console.log(error);
    }
  },
  async googleLogin() {
    try {
      await this.$axios.$get("/sanctum/csrf-cookie").then(async (res) => {
        const response = await this.$axios.$get("/login/google");
        window.location.href = response;
      });
    } catch (error) {
      console.log(error);
    }
  },
  async twitterLoginCallback({ commit }, payload) {
    try {
      await this.$axios.$get("/sanctum/csrf-cookie").then(async (res) => {
        const response = await this.$axios
          .$get("login/twitter/callback", {
            params: payload.params,
          })
          .then((res) => {
            this.$router.replace("/sns-login");
          });
      });
    } catch (error) {
      console.log(error);
    }
  },
  async googleLoginCallback({ commit }, payload) {
    try {
      await this.$axios.$get("/sanctum/csrf-cookie").then(async (res) => {
        const response = await this.$axios
          .$get("login/google/callback", {
            params: payload.params,
          })
          .then((res) => {
            this.$router.replace("/sns-login");
          });
      });
    } catch (error) {
      console.log(error);
    }
  },
};

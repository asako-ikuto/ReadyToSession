export const state = () => ({
  playableList: [],
  playableListDetail: [],
  userPlayableList: [],
  userName: "",
  userId: "",
});

export const getters = {
  playableList: (state) => state.playableList,
  playableListDetail: (state) => state.playableListDetail,
  userPlayableList: (state) => state.userPlayableList,
  userName: (state) => state.userName,
  userId: (state) => state.userId,
};

export const mutations = {
  setPlayableList(state, data) {
    state.playableList = data;
  },
  setPlayableListDetail(state, data) {
    state.playableListDetail = data;
  },
  setUser(state, payload) {
    state.userName = payload.userName;
    state.userId = payload.userId;
  },
  setUserPlayableList(state, data) {
    state.userPlayableList = data;
  },
};

export const actions = {
  async addToPlayablelist({ commit }, payload) {
    try {
      await this.$axios.$get("/sanctum/csrf-cookie").then(async (res) => {
        const response = await this.$axios
          .post("/playablelists/" + payload.song + "/add")
          .then(async (res) => {
            try {
              await this.$axios
                .$get("/sanctum/csrf-cookie")
                .then(async (res) => {
                  const response = await this.$axios.$get("/playablelists");
                  commit("setPlayableList", response);
                  this.$router.push("/home");
                });
            } catch (error) {
              console.log(error);
            }
          });
      });
    } catch (error) {
      console.log(error);
    }
  },
  async removeFromPlayablelist({ commit }, payload) {
    try {
      await this.$axios.$get("/sanctum/csrf-cookie").then(async (res) => {
        const response = await this.$axios
          .post("/playablelists/" + payload.song + "/remove")
          .then(async (res) => {
            try {
              await this.$axios
                .$get("/sanctum/csrf-cookie")
                .then(async (res) => {
                  console.log(res);
                  const response = await this.$axios.$get(
                    "/playablelists/detail"
                  );
                  commit("setPlayableListDetail", response);
                });
            } catch (error) {
              console.log(error);
            }
          });
      });
    } catch (error) {
      console.log(error);
    }
  },
  async fetchPlayableList({ commit }) {
    try {
      await this.$axios.$get("/sanctum/csrf-cookie").then(async (res) => {
        const response = await this.$axios.$get("/playablelists");
        console.log(response);
        commit("setPlayableList", response);
      });
    } catch (error) {
      console.log(error);
    }
  },
  async fetchPlayableListDetail({ commit }) {
    try {
      await this.$axios.$get("/sanctum/csrf-cookie").then(async (res) => {
        const response = await this.$axios.$get("/playablelists/detail");
        console.log(response);
        commit("setPlayableListDetail", response);
      });
    } catch (error) {
      console.log(error);
    }
  },
  setUser({ commit }, payload) {
    commit("setUser", {
      userName: payload.userName,
      userId: payload.userId,
    });
    this.$router.push("/user-playablelist");
  },
  async showUserPlayableList({ commit }, payload) {
    try {
      await this.$axios
        .$get("/sanctum/csrf-cookie")
        .then(async (res) => {
          const userPlayableList = await this.$axios.get(
            "/playablelists/" + payload.userId
          );
          commit("setUserPlayableList", userPlayableList.data);
          console.log(userPlayableList);
        })
        .then(async (res) => {
          try {
            await this.$axios.$get("/sanctum/csrf-cookie").then(async (res) => {
              const myPlayableList = await this.$axios.$get(
                "/playablelists/detail"
              );
              commit("setPlayableListDetail", myPlayableList);
              console.log(myPlayableList);
            });
          } catch (error) {
            console.log(error);
          }
        });
    } catch (error) {
      console.log(error);
    }
  },
};

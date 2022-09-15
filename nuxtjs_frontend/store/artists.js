export const state = () => ({
  artistList: [],
  artistId: "",
  artistName: "",
  //エラーメッセージ
  errors: {
    name: false,
  },
  messages: {
    name: null,
  },
});

export const getters = {
  artistList: (state) => state.artistList,
  artistId: (state) => state.artistId,
  artistName: (state) => state.artistName,
  errors: (state) => state.errors,
  messages: (state) => state.messages,
};

export const mutations = {
  setArtistList(state, data) {
    state.artistList = data;
  },
  setArtist(state, payload) {
    state.artistId = payload.artistId;
    state.artistName = payload.artistName;
  },
  setArtistName(state, data) {
    state.artistName = data;
  },
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
};

export const actions = {
  async fetchArtistList({ commit }) {
    try {
      await this.$axios.$get("/sanctum/csrf-cookie").then(async (res) => {
        const response = await this.$axios.$get("/artists");
        commit("setArtistList", response);
      });
    } catch (error) {
      console.log(error);
    }
  },
  async addArtist({ commit }, payload) {
    try {
      await this.$axios.$get("/sanctum/csrf-cookie").then(async (res) => {
        const response = await this.$axios
          .$post("/artists", {
            name: payload.artistName,
          })
          .then((res) => {
            if (res.status == 400) {
              commit("setErrors", {
                errors: res.errors,
              });
            } else {
              commit("clearErrors");
              this.$router.push("/artistlist");
              console.log(res);
            }
          });
      });
    } catch (error) {
      console.log(error);
    }
  },
  setArtist({ commit }, payload) {
    commit("setArtist", {
      artistId: payload.artistId,
      artistName: payload.artistName,
    });
    this.$router.push("/edit-artist");
  },
  setArtistName({ commit }, payload) {
    commit("setArtistName", payload.artistName);
  },
  async updateArtist({ commit }, payload) {
    try {
      await this.$axios.$get("/sanctum/csrf-cookie").then(async (res) => {
        const response = await this.$axios
          .$put("/artists/" + payload.artistId, {
            name: payload.artistName,
          })
          .then(async (res) => {
            if (res.status == 400) {
              commit("setErrors", {
                errors: res.errors,
              });
            } else {
              commit("clearErrors");
              this.$router.push("/artistlist");
            }
          });
      });
    } catch (error) {
      console.log(error);
    }
  },
  async deleteArtist({ commit }, payload) {
    try {
      await this.$axios.$get("/sanctum/csrf-cookie").then(async (res) => {
        const response = await this.$axios
          .$delete("/artists/" + payload.artistId)
          .then(async (res) => {
            try {
              await this.$axios
                .$get("/sanctum/csrf-cookie")
                .then(async (res) => {
                  const response = await this.$axios.$get("/artists");
                  commit("setArtistList", response);
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
};

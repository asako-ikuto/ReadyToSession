export const state = () => ({
  songList: [],
  songId: "",
  songName: "",
  artistId: "",
  artistName: "",
  //エラーメッセージ
  errors: {
    name: false,
    artist_id: false,
  },
  messages: {
    name: null,
    artist_id: null,
  },
});

export const getters = {
  songList: (state) => state.songList,
  songId: (state) => state.songId,
  songName: (state) => state.songName,
  artistId: (state) => state.artistId,
  artistName: (state) => state.artistName,
  errors: (state) => state.errors,
  messages: (state) => state.messages,
};

export const mutations = {
  setSongList(state, data) {
    state.songList = data;
  },
  setSong(state, payload) {
    state.songId = payload.songId;
    state.songName = payload.songName;
    state.artistId = payload.artistId;
    state.artistName = payload.artistName;
  },
  setSongName(state, data) {
    state.songName = data;
  },
  setArtistId(state, data) {
    state.artistId = data;
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
  async fetchSongList({ commit }) {
    try {
      const response = await this.$axios.$get("/songs");
      commit("setSongList", response);
    } catch (error) {
      console.log(error);
    }
  },
  async addSong({ commit }, payload) {
    try {
      await this.$axios.$get("/sanctum/csrf-cookie").then(async (res) => {
        const response = await this.$axios
          .$post("/songs", {
            name: payload.name,
            artist_id: payload.artistId,
          })
          .then(async (res) => {
            if (res.status == 400) {
              commit("setErrors", {
                errors: res.errors,
              });
            } else {
              commit("clearErrors");
              try {
                const response = await this.$axios.$get("/songs");
                commit("setSongList", response);
                this.$router.push("/songlist");
              } catch (error) {
                console.log(error);
              }
            }
          });
      });
    } catch (error) {
      console.log(error);
    }
  },
  setSong({ commit }, payload) {
    commit("setSong", {
      songId: payload.songId,
      songName: payload.songName,
      artistId: payload.artistId,
      artistName: payload.artistName,
    });
    this.$router.push("/edit-song");
  },
  setSongName({ commit }, payload) {
    commit("setSongName", payload.songName);
  },
  setArtistId({ commit }, payload) {
    commit("setArtistId", payload.artistId);
  },
  async updateSong({ commit }, payload) {
    try {
      await this.$axios.$get("/sanctum/csrf-cookie").then(async (res) => {
        const response = await this.$axios
          .$put("/songs/" + payload.songId, {
            name: payload.songName,
            artist_id: payload.artistId,
          })
          .then(async (res) => {
            if (res.status == 400) {
              commit("setErrors", {
                errors: res.errors,
              });
            } else {
              commit("clearErrors");
              this.$router.push("/songlist");
            }
          });
      });
    } catch (error) {
      console.log(error);
    }
  },
  async deleteSong({ commit }, payload) {
    try {
      await this.$axios.$get("/sanctum/csrf-cookie").then(async (res) => {
        const response = await this.$axios
          .$delete("/songs/" + payload.songId)
          .then(async (res) => {
            try {
              await this.$axios
                .$get("/sanctum/csrf-cookie")
                .then(async (res) => {
                  const response = await this.$axios.$get("/songs");
                  commit("setSongList", response);
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

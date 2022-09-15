export const state = () => ({
  userList: [],
});

export const getters = {
  userList: (state) => state.userList,
};

export const mutations = {
  setUserList(state, data) {
    state.userList = data;
  },
};

export const actions = {
  async fetchUserList({ commit }) {
    try {
      await this.$axios.$get("/sanctum/csrf-cookie").then(async (res) => {
        const response = await this.$axios.$get("/users");
        commit("setUserList", response);
      });
    } catch (error) {
      console.log(error);
    }
  },
};

<template>
  <div class="userlist">
    <v-container>
      <!--SP表示-->
      <v-row class="hidden-md-and-up my-4">
        <v-col cols="12" class="text-center">
          <p class="text-h4 font-weight-bold">ユーザを探す</p>
        </v-col>
        <v-col cols="12" class="text-left">
          <v-text-field
            v-model="searchText"
            outlined
            label="ユーザ名またはアカウントID"
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <template v-for="(user, index) in filteredUsers" :search="searchText">
            <v-list-item :key="index" @click="setUser(user.id, user.name)">
              <!-- <v-list-item-avatar>
                <v-img :src="user.avatarLink" contain />
              </v-list-item-avatar> -->
              <v-list-item-content>
                <v-list-item-title>{{ user.name }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  user.screen_name
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-col>
      </v-row>
      <!--PC表示-->
      <v-row class="text-center hidden-sm-and-down">
        <v-col cols="12" class="my-4">
          <p class="text-h3">ユーザを探す</p>
        </v-col>
        <v-col class="mx-auto" style="max-width: 690px">
          <v-text-field
            v-model="searchText"
            outlined
            label="ユーザ名またはアカウントID"
            prepend-inner-icon="mdi-magnify"
            class="d-inline-block mr-4"
            style="min-width: 450px"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-simple-table
            class="mx-auto"
            style="margin-bottom: 200px; max-width: 1000px"
          >
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">ユーザ名</th>
                  <th class="text-left">アカウントID</th>
                  <th class="text-left"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(user, index) in filteredUsers" :key="index">
                  <td class="text-left">{{ user.name }}</td>
                  <td class="text-left">{{ user.screen_name }}</td>
                  <td class="text-right">
                    <v-btn
                      elevation="2"
                      class="px-10"
                      color="success"
                      rounded
                      @click="setUser(user.id, user.name)"
                    >
                      <v-icon left>mdi-arrow-right-drop-circle-outline</v-icon
                      >演奏できる曲リスト
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <!-- <v-data-table
            :headers="headers"
            :items="users"
            :items-per-page="5"
            :search="searchText"
            class="elevation-1"
          >
            <template v-slot:item.actions="{ item }">
              <v-btn
                elevation="2"
                class="px-10"
                color="success"
                rounded
                @click="setUser(item.id, item.name)"
              >
                <v-icon left>mdi-arrow-right-drop-circle-outline</v-icon
                >演奏できる曲リスト
              </v-btn>
            </template>
          </v-data-table> -->
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "UserlistPage",
  middleware: ["auth"],
  async fetch() {
    await this.$store.dispatch("users/fetchUserList");
  },
  data: () => ({
    searchText: "",
  }),
  computed: {
    filteredUsers() {
      const users = [];
      const userList = this.$store.getters["users/userList"];
      for (let i in userList) {
        const user = userList[i];
        if (
          user.name.indexOf(this.searchText) !== -1 ||
          user.screen_name.indexOf(this.searchText) !== -1
        ) {
          users.push(user);
        }
      }
      return users;
    },
  },
  methods: {
    setUser(userId, userName) {
      this.$store.dispatch("playablelists/setUser", {
        userId: userId,
        userName: userName,
      });
    },
  },
};
</script>

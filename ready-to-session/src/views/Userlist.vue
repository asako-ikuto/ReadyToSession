<template>
  <div class="userlist">
    <v-container>
      <!--SP表示-->
      <v-row class="hidden-md-and-up my-4">
        <v-col cols="12" class="text-center">
          <p class="text-h4 font-weight-bold">
            ユーザを探す
          </p>
        </v-col>
        <v-col
          cols="12"
          class="text-left"
        >
          <v-text-field
            v-model="message2"
            outlined
            label="ユーザ名またはアカウントID"
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
        </v-col>  
        <v-col cols="12">
          <template v-for="(user, index) in users">
            <v-list-item :key="index" to="/user-songlist">
              <v-list-item-avatar>
                <v-img
                  :src="user.avatarLink"
                  contain/>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ user.userName }}</v-list-item-title>
                <v-list-item-subtitle>{{ user.userId }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-col>
        <!--Bottom Nav-->
        <BottomNav></BottomNav>
      </v-row>

      <!--PC表示-->
      <!--sidebar-->
      <Sidebar>
        <router-link to="/" class="text-decoration-none">
                <v-img :src="logo_name" 
                        alt="ReadyToSession"
                        class="shrink my-4 mx-1"
                        contain
                        min-width="200"
                        transition="scale-transition"
                        width="200"></v-img>      
              </router-link>
      </Sidebar>
      <!--PC/SP共通content-->
      <v-row class="text-center hidden-sm-and-down">
        <v-col cols="12" class="my-4">
          <p class="text-h4 font-weight-bold">
            ユーザを探す
          </p>
        </v-col>
        <v-col
          class="mx-auto"
          style="max-width:690px;"
        >
          <v-text-field
            v-model="searchword"
            outlined
            label="ユーザ名またはアカウントID"
            prepend-inner-icon="mdi-magnify"
            class="d-inline-block mr-4"
            style="min-width:450px;"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-data-table
            :headers="headers"
            :items="users"
            :items-per-page="5"
            class="elevation-1"
          >
          <template v-slot:item.actions="">
            <v-btn elevation="2" 
                      class="px-10" 
                      color="success" 
                      rounded
                      to="/user-songlist">
                      <v-icon left>mdi-arrow-right-drop-circle-outline</v-icon>演奏できる曲リスト
                </v-btn>
          </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>  
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar";
import BottomNav from "../components/BottomNav";

export default {
  name: 'Userlist',
  components: {
    Sidebar,
    BottomNav
  },
  data: () => ({
    logo_image: require("../assets/logo.svg"),
    logo_name: require("../assets/logo_name.png"),
    nav_lists:[
      {name: '演奏できる曲リスト',icon: 'mdi-playlist-music'},
      {name: 'ユーザを探す',icon: 'mdi-account-search'},
      {name: 'ログアウト',icon: 'mdi-logout'},
    ],
    headers: [
          {
            text: 'ユーザ名',
            align: 'start',
            sortable: false,
            value: 'userName',
          },
          { text: 'アカウントID', 
            align: 'start',
            value: 'userId' },
          { text: '', 
            align: 'end',
            value: 'actions', sortable: false },
        ],
        users: [
          {
            userName: 'テストユーザ名A',
            userId: 'テストアカウントID',
            avatarLink: require("../assets/logo.svg"),
          },
          {
            userName: 'テストユーザ名B',
            userId: 'テストアカウントID',
            avatarLink: require('../assets/main_image.jpg'),
          },
          {
            userName: 'テストユーザ名C',
            userId: 'テストアカウントID',
            avatarLink: require('../assets/practice.png'),
          },
          {
            userName: 'テストユーザ名D',
            userId: 'テストアカウントID',
          },
          {
            userName: 'テストユーザ名E',
            userId: 'テストアカウントID',
          },
          {
            userName: 'テストユーザ名F',
            userId: 'テストアカウントID',
          },
          {
            userName: 'テストユーザ名G',
            userId: 'テストアカウントID',
          },
          {
            userName: 'テストユーザ名H',
            userId: 'テストアカウントID',
          },
          {
            userName: 'テストユーザ名I',
            userId: 'テストアカウントID',
          },
        ],
  }),
};
</script>

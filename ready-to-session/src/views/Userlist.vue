<template>
  <div class="userlist">
    <v-container>
      <!--SP表示-->
      <v-row class="hidden-md-and-up" style="margin-top:-56px;">
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
          <router-link to="/index" class="text-decoration-none">
          <v-list-item>
            <v-list-item-avatar>
              <v-img
                :src="require('../assets/main_image.jpg')"
                contain/>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>ユーザ名</v-list-item-title>
              <v-list-item-subtitle>アカウントID</v-list-item-subtitle>
            </v-list-item-content>  
          </v-list-item>
          </router-link>
          <v-divider></v-divider>
        </v-col>
      </v-row>

      <!--PC表示-->
      <!--sidebar-->
      <v-navigation-drawer app mobile-breakpoint="960" class="text-light" color="success" dark>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              <router-link to="/" class="text-decoration-none">
                <v-img :src="logo_name" 
                        alt="ReadyToSession"
                        class="shrink my-4 mx-1"
                        contain
                        min-width="200"
                        transition="scale-transition"
                        width="200"></v-img>      
              </router-link>
            </v-list-item-title>
            <v-divider></v-divider>
          </v-list-item-content>      
        </v-list-item>
        <v-list nav>
          <v-list-item v-for="nav_list in nav_lists" :key="nav_list.name" link>
            <v-list-item-icon>
              <v-icon>{{ nav_list.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ nav_list.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <!--content-->
      <v-row class="text-center hidden-sm-and-down">
        <v-col cols="12" class="my-4">
          <p class="text-h3">
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
            <router-link to="/index" class="text-decoration-none">
              <v-btn elevation="2" class="px-10" color="success" 
                    rounded><v-icon left>mdi-arrow-right-drop-circle-outline</v-icon>演奏できる曲リスト
              </v-btn>
            </router-link>
          </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>  
  </div>
</template>

<script>

export default {
  name: 'Userlist',

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
            userName: 'テストユーザ名',
            userId: 'テストアカウントID',
          },
          {
            userName: 'テストユーザ名',
            userId: 'テストアカウントID',
          },
          {
            userName: 'テストユーザ名',
            userId: 'テストアカウントID',
          },
        ],
  }),
};
</script>

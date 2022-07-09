<template>
  <div class="index">
    <v-container>
      <!--SP表示-->
      <v-row class="text-left hidden-md-and-up" style="margin-top:-56px;">
        <v-col cols="10">
          <p class="text-h4 font-weight-bold">
            演奏できる曲リスト
          </p>
        </v-col>
        <v-col cols="2">
          <router-link to="/add-song" class="text-decoration-none">
            <v-btn
              class="mr-2"
              fab
              small
              dark
              depressed
              color="success"
            >
              <v-icon dark>
                mdi-plus
              </v-icon>
            </v-btn>
          </router-link>
        </v-col>
        <v-col
          cols="12"
        >
          <v-text-field
            v-model="message2"
            outlined
            label="曲名またはアーティスト名"
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
          <v-tabs grow class="mx-auto" background-color="transparent" color="success">
            <v-tab><span style="font-size:1.1rem">すべて</span></v-tab>
            <v-tab><span style="font-size:1.1rem">演奏可能</span></v-tab>
            <v-tab><span style="font-size:1.1rem">練習中</span></v-tab>
            <v-tabs-slider color="success" />
          </v-tabs>
        </v-col>  
        <v-col cols="12">
          <v-list-item>
            <v-list-item-avatar>
              <v-img
                :src="require('../assets/main_image.jpg')"
                contain/>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>曲名</v-list-item-title>
              <v-list-item-subtitle>アーティスト名</v-list-item-subtitle>
            </v-list-item-content>  
            <v-list-item-action>
              <v-list-item-action-text>2022/6/26</v-list-item-action-text>
              <v-list-item-action-text><svg role="img" height="24" width="24" viewBox="0 0 24 24"><path d="M4.5 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm15 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-7.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg></v-list-item-action-text> 
            </v-list-item-action>  
          </v-list-item>
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
            演奏できる曲リスト
          </p>
        </v-col>
        <v-col
          class="mx-auto"
          style="max-width:690px;"
        >
          <v-text-field
            v-model="searchword"
            outlined
            label="曲名またはアーティスト名"
            prepend-inner-icon="mdi-magnify"
            class="d-inline-block mr-4"
            style="min-width:450px;"
          ></v-text-field>
          <router-link to="/add-song" class="text-decoration-none">
              <v-btn elevation="2" class="px-10" color="success" 
                    rounded large style="font-size:1.2rem;"><v-icon left>mdi-plus</v-icon>追加する
              </v-btn>
          </router-link>
          <v-tabs grow class="mx-auto" background-color="transparent" color="success">
            <v-tab><span style="font-size:1.1rem">すべて</span></v-tab>
            <v-tab><span style="font-size:1.1rem">演奏可能</span></v-tab>
            <v-tab><span style="font-size:1.1rem">練習中</span></v-tab>
            <v-tabs-slider color="success" />
          </v-tabs>
        </v-col>
        <v-col cols="12">
          <v-data-table
            :headers="headers"
            :items="playableSongs"
            :items-per-page="5"
            class="elevation-1"
          >
          <template v-slot:item.actions="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>  
  </div>
</template>

<script>

export default {
  name: 'Index',

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
            text: 'ステータス',
            align: 'start',
            sortable: false,
            value: 'status',
          },
          { text: '曲名', value: 'songName' },
          { text: 'アーティスト名', value: 'artistName' },
          { text: '追加日', value: 'addDate' },
          { text: '', value: 'actions', sortable: false },
        ],
        playableSongs: [
          {
            status: '演奏可',
            songName: 'テスト曲名',
            artistName: 'テストアーティスト名',
            addDate: '2022/6/29',
          },
          {
            status: '演奏可',
            songName: 'テスト曲名',
            artistName: 'テストアーティスト名',
            addDate: '2022/6/29',
          },
          {
            status: '演奏可',
            songName: 'テスト曲名',
            artistName: 'テストアーティスト名',
            addDate: '2022/6/29',
          },
        ],
  }),
};
</script>

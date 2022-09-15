<template>
  <div class="index">
    <v-container>
      <!--SP表示-->
      <v-row class="text-left hidden-md-and-up"> 
        <router-link to="/add-song" class="text-decoration-none">
          <v-btn fixed fab bottom right color="success" style="bottom: 100px">  
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
        </router-link> 
        <v-col cols="12" class="text-center">
          <p class="text-h4 font-weight-bold my-4">
            演奏できる曲リスト
          </p>
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
        <v-col cols="12" style="margin-bottom:200px;">
          <v-list two-line>
            <template v-for="(song, index) in playableSongs">
              <v-list-item :key="index">
                <v-list-item-avatar v-if="song.status == '1'">
                  <v-icon
                    large
                    color="success"
                  >
                    mdi-checkbox-marked-circle
                  </v-icon>
                </v-list-item-avatar>
                <v-list-item-avatar v-if="song.status == '2'">
                  <v-icon
                      large
                      color="success"
                    >
                      mdi-checkbox-blank-circle-outline
                    </v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{song.songName}}</v-list-item-title>
                  <v-list-item-subtitle>{{song.artistName}}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-list-item-action-text>{{song.addDate}}</v-list-item-action-text>
                  <v-menu
                    top
                    :close-on-click="closeOnClick">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        icon>
                        <v-icon>mdi-dots-horizontal</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item to="/edit">
                        <v-list-item-title>編集する</v-list-item-title>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-title>削除する</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-list-item-action>
              </v-list-item>
            </template>
          </v-list>
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
      <!--PCcontent-->
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
          <router-link to="/add-song" class="text-decoration-none">
          <v-btn fixed fab bottom right large color="success" style="right: 100px;bottom: 100px">  
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
        </router-link> 
          <v-text-field
            v-model="searchword"
            outlined
            label="曲名またはアーティスト名"
            prepend-inner-icon="mdi-magnify"
            class="d-inline-block mr-4"
            style="min-width:450px;"
          ></v-text-field>
          <!-- <v-btn elevation="2" 
                     class="px-10" 
                     color="success" 
                     rounded large 
                     style="font-size:1.2rem;"
                     to="/add-song"><v-icon left>mdi-plus</v-icon>追加する
              </v-btn> -->
          <v-tabs grow class="mx-auto" background-color="transparent" color="success">
            <v-tab><span style="font-size:1.1rem">すべて</span></v-tab>
            <v-tab><span style="font-size:1.1rem">演奏可能</span></v-tab>
            <v-tab><span style="font-size:1.1rem">練習中</span></v-tab>
            <v-tabs-slider color="success" />
          </v-tabs>
        </v-col>
        <v-col cols="12">
          <!-- <v-data-table
            :headers="headers"
            :items="playableSongs"
            :items-per-page="5"
            class="elevation-1"
          >
          <template v-slot:item.actions="{ item }">
            <v-menu
              top
              :close-on-click="closeOnClick">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    icon>
                    <v-icon>mdi-dots-horizontal</v-icon>
                  </v-btn>
                </template>
                      <v-list>
                        <v-list-item to="/edit">
                          <v-list-item-title @click="editItem(item)">編集する</v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-title @click="deleteItem(item)">削除する</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
            </template>      
          </v-data-table> -->
          <v-simple-table style="margin-bottom:200px;">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    ステータス
                  </th>
                  <th class="text-left">
                    曲名
                  </th>
                  <th class="text-left">
                    アーティスト名
                  </th>
                  <th class="text-left">
                    追加日
                  </th>
                  <th class="text-left"></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(song, index) in playableSongs"
                  :key="index"
                >
                  <td class="text-left">
                    <div v-if="song.status == '1'">
                      <v-icon
                        left
                        large
                        color="success"
                      >
                        mdi-checkbox-marked-circle
                      </v-icon>演奏可能
                    </div>
                    <div v-if="song.status == '2'">
                      <v-icon
                        left
                        large
                        color="success"
                      >
                        mdi-checkbox-blank-circle-outline
                      </v-icon>練習中
                    </div>
                  </td>
                  <td class="text-left">{{ song.songName }}</td>
                  <td class="text-left">{{ song.artistName }}</td>
                  <td class="text-left">{{ song.addDate }}</td>
                  <td class="text-left">
                    <v-menu
                      top
                      :close-on-click="closeOnClick">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                              v-bind="attrs"
                              v-on="on"
                              icon>
                              <v-icon>mdi-dots-horizontal</v-icon>
                            </v-btn>
                          </template>
                          <v-list>
                            <v-list-item to="/edit">
                              <v-list-item-title>編集する</v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>削除する</v-list-item-title>
                            </v-list-item>
                          </v-list>       
                    </v-menu>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-container>  
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar";
import BottomNav from "../components/BottomNav";

export default {
  name: 'Index',
  components: {
    Sidebar,
    BottomNav
  },
  data: () => ({
    logo_name: require("../assets/logo_name.png"),
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
            status: '1',
            songName: 'テスト曲名',
            artistName: 'テストアーティスト名',
            addDate: '2022/6/29',
          },
          {
            status: '2',
            songName: 'テスト曲名',
            artistName: 'テストアーティスト名',
            addDate: '2022/6/29',
          },
          {
            status: '2',
            songName: 'テスト曲名',
            artistName: 'テストアーティスト名',
            addDate: '2022/6/29',
          },
          {
            status: '1',
            songName: 'テスト曲名',
            artistName: 'テストアーティスト名',
            addDate: '2022/6/29',
          },
          {
            status: '1',
            songName: 'テスト曲名',
            artistName: 'テストアーティスト名',
            addDate: '2022/6/29',
          },
          {
            status: '2',
            songName: 'テスト曲名',
            artistName: 'テストアーティスト名',
            addDate: '2022/6/29',
          },
          {
            status: '1',
            songName: 'テスト曲名',
            artistName: 'テストアーティスト名',
            addDate: '2022/6/29',
          },
          {
            status: '2',
            songName: 'テスト曲名',
            artistName: 'テストアーティスト名',
            addDate: '2022/6/29',
          },
          {
            status: '1',
            songName: 'テスト曲名',
            artistName: 'テストアーティスト名',
            addDate: '2022/6/29',
          },
          {
            status: '1',
            songName: 'テスト曲名',
            artistName: 'テストアーティスト名',
            addDate: '2022/6/29',
          },
          {
            status: '2',
            songName: 'テスト曲名',
            artistName: 'テストアーティスト名',
            addDate: '2022/6/29',
          },
          {
            status: '1',
            songName: 'テスト曲名',
            artistName: 'テストアーティスト名',
            addDate: '2022/6/29',
          },
        ],
  }),
};
</script>

<template>
  <div class="songlist">
    <v-form>
      <v-container>
        <!--SP表示-->
        <v-row class="hidden-md-and-up my-4">
          <router-link to="/add-song" class="text-decoration-none">
            <v-btn fixed fab bottom right color="success" style="bottom: 100px">
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </router-link>
          <v-col cols="12" class="text-center">
            <p class="text-h4 font-weight-bold">曲一覧</p>
          </v-col>
          <v-col cols="12" class="text-left">
            <v-text-field
              v-model="searchText"
              outlined
              label="曲名またはアーティスト名"
              prepend-inner-icon="mdi-magnify"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <template
              v-for="(song, index) in filteredSongs"
              :search="searchText"
            >
              <v-list-item :key="index">
                <v-list-item-content>
                  <v-list-item-title>{{ song.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{
                    song.artist_name
                  }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-menu top :close-on-click="closeOnClick">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn v-bind="attrs" v-on="on" icon>
                        <v-icon>mdi-dots-horizontal</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item
                        @click="
                          setSong(
                            song.id,
                            song.name,
                            song.artist_id,
                            song.artist_name
                          )
                        "
                      >
                        <v-list-item-title>編集する</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="deleteSong(song.id)">
                        <v-list-item-title>削除する</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-list-item-action>
              </v-list-item>
            </template>
          </v-col>
        </v-row>
        <!--PC表示-->
        <v-row class="text-center hidden-sm-and-down">
          <v-col cols="12" class="my-4">
            <p class="text-h4 font-weight-bold">曲一覧</p>
          </v-col>
          <v-col class="mx-auto" style="max-width: 690px">
            <router-link to="/add-song" class="text-decoration-none">
              <v-btn
                fixed
                fab
                bottom
                right
                large
                color="success"
                style="right: 100px; bottom: 100px"
              >
                <v-icon dark>mdi-plus</v-icon>
              </v-btn>
            </router-link>
            <v-text-field
              v-model="searchText"
              outlined
              label="曲名またはアーティスト名"
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
                    <th class="text-left">曲名</th>
                    <th class="text-left">アーティスト名</th>
                    <th class="text-left"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(song, index) in filteredSongs" :key="index">
                    <td class="text-left">{{ song.name }}</td>
                    <td class="text-left">{{ song.artist_name }}</td>
                    <td class="text-right">
                      <v-menu top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn v-bind="attrs" v-on="on" icon>
                            <v-icon>mdi-dots-horizontal</v-icon>
                          </v-btn>
                        </template>
                        <v-list>
                          <v-list-item
                            @click="
                              setSong(
                                song.id,
                                song.name,
                                song.artist_id,
                                song.artist_name
                              )
                            "
                          >
                            <v-list-item-title>編集する</v-list-item-title>
                          </v-list-item>
                          <v-list-item @click="deleteSong(song.id)">
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
    </v-form>
  </div>
</template>

<script>
export default {
  name: "SonglistPage",
  layout: "adminDefault",
  middleware: ["admin"],
  async fetch() {
    await this.$store.dispatch("songs/fetchSongList");
  },
  data: () => ({
    searchText: "",
  }),
  computed: {
    filteredSongs() {
      let songs = [];
      const songList = this.$store.getters["songs/songList"];
      for (let i in songList) {
        let song = songList[i];
        if (
          song.name.toLowerCase().indexOf(this.searchText.toLowerCase()) !==
            -1 ||
          song.artist_name
            .toLowerCase()
            .indexOf(this.searchText.toLowerCase()) !== -1
        ) {
          songs.push(song);
        }
      }
      return songs;
    },
  },
  methods: {
    setSong(songId, songName, artistId, artistName) {
      this.$store.dispatch("songs/setSong", {
        songId: songId,
        songName: songName,
        artistId: artistId,
        artistName: artistName,
      });
    },
    deleteSong(songId) {
      this.$store.dispatch("songs/deleteSong", {
        songId: songId,
      });
    },
  },
};
</script>

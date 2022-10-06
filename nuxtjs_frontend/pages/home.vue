<template>
  <div class="home">
    <!--SP表示-->
    <v-row class="text-left hidden-md-and-up my-4">
      <router-link to="/add-playablelist" class="text-decoration-none">
        <v-btn fixed fab bottom right color="success" style="bottom: 100px">
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </router-link>
      <v-col cols="12" class="text-center">
        <p class="text-h4 font-weight-bold">演奏できる曲リスト</p>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="searchText"
          outlined
          label="曲名またはアーティスト名"
          prepend-inner-icon="mdi-magnify"
        ></v-text-field>
      </v-col>
      <v-col cols="12" style="margin-bottom: 200px">
        <v-list two-line>
          <template>
            <v-list-item v-for="song in playableSongs" v-bind:key="song.id">
              <v-list-item-content>
                <v-list-item-title>{{ song.name }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  song.artist_name
                }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-action-text>{{
                  $dateFns.format(new Date(song.updated_at), "yyyy.MM.dd")
                }}</v-list-item-action-text>
                <v-menu top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" icon>
                      <v-icon>mdi-dots-horizontal</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item @click="removeFromPlayableList(song.id)">
                      <v-list-item-title>削除する</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-list-item-action>
            </v-list-item>
          </template>
        </v-list>
      </v-col>
    </v-row>
    <!--PC表示-->
    <v-row class="text-center hidden-sm-and-down">
      <v-col cols="12" class="my-4">
        <p class="text-h3">演奏できる曲リスト</p>
      </v-col>
      <v-col class="mx-auto" style="max-width: 690px">
        <router-link to="/add-playablelist" class="text-decoration-none">
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
        <v-simple-table style="margin-bottom: 200px">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">曲名</th>
                <th class="text-left">アーティスト名</th>
                <th class="text-left">追加日</th>
                <th class="text-left"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(song, index) in playableSongs" :key="index">
                <td class="text-left">{{ song.name }}</td>
                <td class="text-left">{{ song.artist_name }}</td>
                <td class="text-left">
                  {{ $dateFns.format(new Date(song.updated_at), "yyyy.MM.dd") }}
                </td>
                <td class="text-left">
                  <v-menu top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn v-bind="attrs" v-on="on" icon>
                        <v-icon>mdi-dots-horizontal</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item @click="removeFromPlayableList(song.id)">
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
  </div>
</template>

<script>
export default {
  name: "HomePage",
  middleware: ["isauth"],
  async fetch({ store }) {
    //await this.$store.dispatch("playablelists/fetchPlayableListDetail");
    await store.dispatch("playablelists/fetchPlayableListDetail");
  },
  data: () => ({
    searchText: "",
  }),
  computed: {
    playableSongs() {
      let songs = [];
      const songList = this.$store.getters["playablelists/playableListDetail"];
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
    removeFromPlayableList(song) {
      this.$store.dispatch("playablelists/removeFromPlayablelist", {
        song: song,
      });
    },
  },
};
</script>

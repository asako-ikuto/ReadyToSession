<template>
  <div class="user-songlist">
    <v-container>
      <!--SP表示-->
      <v-row class="text-left hidden-md-and-up my-4">
        <v-col cols="12">
          <p class="text-h4 font-weight-bold">
            {{
              this.$store.getters["playablelists/userName"]
            }}の演奏できる曲リスト
          </p>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="searchText"
            outlined
            label="曲名またはアーティスト名"
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
          <v-tabs
            grow
            class="mx-auto"
            background-color="transparent"
            color="success"
          >
            <v-tab><span style="font-size: 1.1rem">すべて</span></v-tab>
            <v-tab><span style="font-size: 1.1rem">セッション可能</span></v-tab>
            <v-tabs-slider color="success" />
            <v-tab-item>
              <v-col cols="12">
                <template v-for="(song, index) in userPlayableSongs">
                  <v-list-item :key="index">
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
                      <v-list-item-action-text>
                        <v-icon
                          @click="addToPlayablelist(song.id)"
                          v-if="
                            !playableSongs.find(
                              (playableSong) => playableSong.id === song.id
                            )
                          "
                          color="success"
                        >
                          mdi-plus-circle
                        </v-icon>
                      </v-list-item-action-text>
                    </v-list-item-action>
                  </v-list-item>
                </template>
              </v-col>
            </v-tab-item>
            <v-tab-item>
              <v-col cols="12">
                <template v-for="(song, index) in sessionAvailableSongs">
                  <v-list-item :key="index">
                    <v-list-item-content>
                      <v-list-item-title>{{ song.name }}</v-list-item-title>
                      <v-list-item-subtitle>{{
                        song.artist_name
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-col>
            </v-tab-item>
          </v-tabs>
        </v-col>
      </v-row>

      <!--PC表示-->
      <v-row class="text-center hidden-sm-and-down">
        <v-col cols="12" class="my-4">
          <p class="text-h4 font-weight-bold">
            {{
              this.$store.getters["playablelists/userName"]
            }}の演奏できる曲リスト
          </p>
        </v-col>
        <v-col class="mx-auto" style="max-width: 1024px">
          <v-text-field
            v-model="searchText"
            outlined
            label="曲名またはアーティスト名"
            prepend-inner-icon="mdi-magnify"
            class="d-inline-block mr-4"
            style="min-width: 450px"
          ></v-text-field>
          <v-tabs
            grow
            class="mx-auto"
            background-color="transparent"
            color="success"
          >
            <v-tab><span style="font-size: 1.1rem">すべて</span></v-tab>
            <v-tab><span style="font-size: 1.1rem">セッション可能</span></v-tab>
            <v-tabs-slider color="success" />
            <v-tab-item>
              <v-col cols="12">
                <v-simple-table>
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
                      <tr
                        v-for="(song, index) in userPlayableSongs"
                        :key="index"
                      >
                        <td class="text-left">{{ song.name }}</td>
                        <td class="text-left">{{ song.artist_name }}</td>
                        <td class="text-left">
                          {{
                            $dateFns.format(
                              new Date(song.updated_at),
                              "yyyy.MM.dd"
                            )
                          }}
                        </td>
                        <td class="text-left">
                          <v-btn
                            elevation="2"
                            class="px-10"
                            color="success"
                            rounded
                            @click="addToPlayablelist(song.id)"
                            v-if="
                              !playableSongs.find(
                                (playableSong) => playableSong.id === song.id
                              )
                            "
                          >
                            <v-icon left>mdi-plus</v-icon
                            >演奏できる曲リストに追加
                          </v-btn>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
            </v-tab-item>
            <v-tab-item>
              <v-col cols="12">
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">曲名</th>
                        <th class="text-left">アーティスト名</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(song, index) in sessionAvailableSongs"
                        :key="index"
                      >
                        <td class="text-left">{{ song.name }}</td>
                        <td class="text-left">{{ song.artist_name }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
            </v-tab-item>
          </v-tabs>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "UserSonglistPage",
  middleware: ["auth"],
  async fetch() {
    const userId = this.$store.getters["playablelists/userId"];
    await this.$store.dispatch("playablelists/showUserPlayableList", {
      userId: userId,
    });
  },
  data: () => ({
    searchText: "",
  }),
  computed: {
    userPlayableSongs() {
      const songs = [];
      const songList = this.$store.getters["playablelists/userPlayableList"];
      for (let i in songList) {
        const song = songList[i];
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
    playableSongs() {
      return this.$store.getters["playablelists/playableListDetail"];
    },
    sessionAvailableSongs() {
      const userPlayableList =
        this.$store.getters["playablelists/userPlayableList"];
      const myPlayableList =
        this.$store.getters["playablelists/playableListDetail"];
      const sessionAvailableSongs = userPlayableList.filter(
        (x) => myPlayableList.filter((y) => y.id === x.id).length > 0
      );
      //検索機能
      const songs = [];
      for (let i in sessionAvailableSongs) {
        const song = sessionAvailableSongs[i];
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
};
</script>

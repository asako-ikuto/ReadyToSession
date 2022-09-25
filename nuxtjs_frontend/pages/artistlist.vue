<template>
  <div class="artistlist">
    <v-form>
      <v-container>
        <!--SP表示-->
        <v-row class="hidden-md-and-up my-4">
          <router-link to="/add-artist" class="text-decoration-none">
            <v-btn fixed fab bottom right color="success" style="bottom: 100px">
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </router-link>
          <v-col cols="12" class="text-center">
            <p class="text-h4 font-weight-bold">アーティスト一覧</p>
          </v-col>
          <v-col cols="12" class="text-left">
            <v-text-field
              v-model="searchText"
              outlined
              label="アーティスト名"
              prepend-inner-icon="mdi-magnify"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <template
              v-for="(artist, index) in filteredArtists"
              :search="searchText"
            >
              <v-list-item :key="index">
                <v-list-item-content>
                  <v-list-item-title>{{ artist.name }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-menu top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn v-bind="attrs" v-on="on" icon>
                        <v-icon>mdi-dots-horizontal</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item @click="setArtist(artist.id, artist.name)">
                        <v-list-item-title>編集する</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="deleteArtist(artist.id)">
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
            <p class="text-h4 font-weight-bold">アーティスト一覧</p>
          </v-col>
          <v-col class="mx-auto" style="max-width: 690px">
            <router-link to="/add-artist" class="text-decoration-none">
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
              label="アーティスト名"
              prepend-inner-icon="mdi-magnify"
              class="d-inline-block mr-4"
              style="min-width: 450px"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-simple-table
              class="mx-auto"
              style="margin-bottom: 200px; max-width: 600px"
            >
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">アーティスト名</th>
                    <th class="text-right"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(artist, index) in filteredArtists" :key="index">
                    <td class="text-left">{{ artist.name }}</td>
                    <td class="text-right">
                      <v-menu top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn v-bind="attrs" v-on="on" icon>
                            <v-icon>mdi-dots-horizontal</v-icon>
                          </v-btn>
                        </template>
                        <v-list>
                          <v-list-item
                            @click="setArtist(artist.id, artist.name)"
                          >
                            <v-list-item-title>編集する</v-list-item-title>
                          </v-list-item>
                          <v-list-item @click="deleteArtist(artist.id)">
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
  name: "ArtistlistPage",
  layout: "adminDefault",
  middleware: ["admin"],
  async fetch() {
    await this.$store.dispatch("artists/fetchArtistList");
  },
  data: () => ({
    searchText: "",
  }),
  computed: {
    filteredArtists() {
      let artists = [];
      const artistList = this.$store.getters["artists/artistList"];
      for (let i in artistList) {
        let artist = artistList[i];
        if (
          artist.name.toLowerCase().indexOf(this.searchText.toLowerCase()) !==
          -1
        ) {
          artists.push(artist);
        }
      }
      return artists;
    },
  },
  methods: {
    setArtist(artistId, artistName) {
      this.$store.dispatch("artists/setArtist", {
        artistId: artistId,
        artistName: artistName,
      });
    },
    deleteArtist(artistId) {
      this.$store.dispatch("artists/deleteArtist", {
        artistId: artistId,
      });
    },
  },
};
</script>

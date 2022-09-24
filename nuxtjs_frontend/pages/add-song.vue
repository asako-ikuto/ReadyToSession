<template>
  <div class="add-song">
    <v-form ref="addSong">
      <v-container>
        <v-row style="max-width: 500px" class="mx-auto text-center my-4">
          <v-col cols="12">
            <p class="text-h4 font-weight-bold my-4">曲を追加</p>
          </v-col>
          <v-col cols="12" class="mb-0">
            <v-text-field
              v-model="name"
              :rules="[rules.required]"
              :error="errors.name"
              :error-messages="messages.name"
              label="曲名"
              outlined
              required
            ></v-text-field>
            <v-autocomplete
              v-model="artistId"
              :items="artists"
              item-value="id"
              item-text="name"
              :rules="[rules.required]"
              :error="errors.artist_id"
              :error-messages="messages.artist_id"
              label="アーティスト名"
              outlined
              required
            ></v-autocomplete>
            <div style="text-align: right">
              <router-link to="/add-artist" class="text-right"
                >アーティストを追加する</router-link
              >
            </div>
          </v-col>
          <v-col cols="12">
            <v-btn
              elevation="2"
              class="px-10"
              color="success"
              rounded
              large
              block
              style="font-size: 1.2rem"
              @click="addSong"
              >追加する</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "AddSongPage",
  layout: "adminDefault",
  middleware: ["admin", "isauth"],
  mounted() {
    //バリデーションリセット
    this.$refs.addSong.resetValidation();
  },
  async fetch() {
    await this.$store.dispatch("artists/fetchArtistList");
  },
  data: () => ({
    name: "",
    artistId: "",
    //バリデーション
    rules: {
      required: (value) => !!value || "入力必須",
    },
  }),
  computed: {
    artists() {
      return this.$store.getters["artists/artistList"];
    },
    errors() {
      return this.$store.getters["songs/errors"];
    },
    messages() {
      return this.$store.getters["songs/messages"];
    },
  },
  methods: {
    addSong() {
      if (this.$refs.addSong.validate()) {
        this.$store.dispatch("songs/addSong", {
          name: this.name,
          artistId: this.artistId,
        });
      }
    },
  },
};
</script>

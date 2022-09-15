<template>
  <div class="edit-song">
    <v-form ref="editSong">
      <v-container>
        <v-row style="max-width: 500px" class="mx-auto text-center my-4">
          <v-col cols="12">
            <p class="text-h4 font-weight-bold my-4">編集する</p>
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
              @click="updateSong"
              >更新する</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "EditSongPage",
  layout: "adminDefault",
  middleware: ["admin", "auth"],
  mounted() {
    //バリデーションリセット
    this.$refs.editSong.resetValidation();
  },
  async fetch() {
    await this.$store.dispatch("artists/fetchArtistList");
  },
  data: () => ({
    //バリデーション
    rules: {
      required: (value) => !!value || "入力必須",
    },
  }),
  computed: {
    artists() {
      return this.$store.getters["artists/artistList"];
    },
    name: {
      get() {
        return this.$store.getters["songs/songName"];
      },
      set(value) {
        this.$store.dispatch("songs/setSongName", {
          songName: value,
        });
      },
    },
    artistId: {
      get() {
        return this.$store.getters["songs/artistId"];
      },
      set(value) {
        this.$store.dispatch("songs/setArtistId", { artistId: value });
      },
    },
    errors() {
      return this.$store.getters["songs/errors"];
    },
    messages() {
      return this.$store.getters["songs/messages"];
    },
  },
  methods: {
    updateSong() {
      const songId = this.$store.getters["songs/songId"];
      const songName = this.$store.getters["songs/songName"];
      const artistId = this.$store.getters["songs/artistId"];
      if (this.$refs.editSong.validate()) {
        this.$store.dispatch("songs/updateSong", {
          songId: songId,
          songName: songName,
          artistId: artistId,
        });
      }
    },
  },
};
</script>

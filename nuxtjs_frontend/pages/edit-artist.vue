<template>
  <div class="edit">
    <v-form ref="editArtist">
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
              label="アーティスト名"
              outlined
              required
            ></v-text-field>
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
              @click="updateArtist"
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
  name: "EditArtistPage",
  layout: "adminDefault",
  middleware: ["admin"],
  mounted() {
    //バリデーションリセット
    this.$refs.editArtist.resetValidation();
  },
  data: () => ({
    //バリデーション
    rules: {
      required: (value) => !!value || "入力必須",
    },
  }),
  computed: {
    name: {
      get() {
        return this.$store.getters["artists/artistName"];
      },
      set(value) {
        this.$store.dispatch("artists/setArtistName", {
          artistName: value,
        });
      },
    },
    errors() {
      return this.$store.getters["artists/errors"];
    },
    messages() {
      return this.$store.getters["artists/messages"];
    },
  },
  methods: {
    updateArtist() {
      const artistId = this.$store.getters["artists/artistId"];
      const artistName = this.$store.getters["artists/artistName"];
      if (this.$refs.editArtist.validate()) {
        this.$store.dispatch("artists/updateArtist", {
          artistId: artistId,
          artistName: artistName,
        });
      }
    },
  },
};
</script>

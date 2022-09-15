<template>
  <div class="add-song">
    <v-form ref="addArtist">
      <v-container>
        <v-row style="max-width: 500px" class="mx-auto text-center my-4">
          <v-col cols="12">
            <p class="text-h4 font-weight-bold my-4">アーティストを追加</p>
          </v-col>
          <v-col cols="12">
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
              @click="addArtist"
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
  name: "AddArtistPage",
  layout: "adminDefault",
  middleware: ["admin", "auth"],
  data: () => ({
    name: "",
    //バリデーション
    rules: { required: (value) => !!value || "入力必須" },
  }),
  mounted() {
    //バリデーションリセット
    this.$refs.addArtist.resetValidation();
  },
  computed: {
    errors() {
      return this.$store.getters["artists/errors"];
    },
    messages() {
      return this.$store.getters["artists/messages"];
    },
  },
  methods: {
    addArtist() {
      if (this.$refs.addArtist.validate()) {
        this.$store.dispatch("artists/addArtist", {
          artistName: this.name,
        });
      }
    },
  },
};
</script>

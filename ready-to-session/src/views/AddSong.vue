<template>
  <div class="add-song">
    <v-form v-model="valid">
      <v-container>
        <v-row class="text-left hidden-md-and-up" style="margin-top:-56px;">
          <v-col
          cols="12" class="text-left"
        >
            <router-link to="/index" class="text-decoration-none">
              <v-btn
                text>
                <span class="mr-2 text-subtitle-1 font-weight-bold">back</span>
              </v-btn></router-link>
          </v-col>
        </v-row>
        <v-row class="text-center">
          <v-col class="my-4">
            <p class="text-h4 mb-6">
              演奏できる曲を追加
            </p>
          </v-col>
        </v-row>
        <v-row style="max-width:500px" class="mx-auto">
          <v-col
            cols="12"
          >
            <v-text-field
              v-model="username"
              :rules="nameRules"
              label="曲名"
              outlined
              required
            ></v-text-field>
            <v-text-field
              v-model="userId"
              :rules="nameRules"
              label="アーティスト名"
              outlined
              required
            ></v-text-field>
            <div class="flex-center">
              <v-radio-group
                v-model="status"
                row
              >
                <v-layout>
                  <v-flex>
                    <v-radio
                      label="演奏可能"
                      value="1"
                    ></v-radio>
                  </v-flex>
                  <v-flex>
                    <v-radio
                      label="練習中"
                      value="2"
                    ></v-radio>
                  </v-flex>
                </v-layout>
              </v-radio-group>
            </div> 
          </v-col>
          <v-col
          cols="12"
          >
            <router-link to="/index" class="text-decoration-none">
              <v-btn elevation="2" class="px-10" color="success" rounded large block style="font-size:1.2rem;">追加する</v-btn>
            </router-link>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>

export default {
  name: 'Index',

  data: () => ({
    status: '1',
  }),
};
</script>

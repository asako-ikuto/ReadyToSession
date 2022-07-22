<template>
  <div class="add-song">
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
    <!--SP表示-->
    <v-row class="hidden-md-and-up">
      <!--Bottom Nav-->
        <BottomNav></BottomNav>
    </v-row>
    <!--PC/SP共通content-->
    <v-form v-model="valid">
      <v-container>
        <v-row style="max-width:500px" class="mx-auto text-center my-4">
          <v-col
            cols="12">
            <p class="text-h4 font-weight-bold my-4"> 
              演奏できる曲を追加
            </p>
          </v-col>
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
            <v-btn elevation="2" 
                      class="px-10" 
                      color="success" 
                      rounded large block 
                      style="font-size:1.2rem;"
                      to="/index">追加する</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar";
import BottomNav from "../components/BottomNav";

export default {
  name: 'AddSong',
  components: {
    Sidebar,
    BottomNav
  },
  data: () => ({
    logo_name: require("../assets/logo_name.png"),
    status: '1',
  }),
};
</script>

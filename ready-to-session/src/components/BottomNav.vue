<template>
  <div class="bottom-nav">
    <template>
      <v-bottom-navigation
        color="success"
        grow
        style="bottom: 0px"
        fixed
      >
        <v-btn to="/index">
          <span>マイリスト</span>
          <v-icon>mdi-playlist-music</v-icon>
        </v-btn>
        <v-btn to="/userlist">
          <span>ユーザを探す</span>
          <v-icon>mdi-account-search</v-icon>
        </v-btn>
        <v-btn to="/login">
          <span>ログアウト</span>
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </template>    
  </div>
</template>

<script>
export default {
  name: 'BottomNav',
  data: () => ({
  }),
};
</script>

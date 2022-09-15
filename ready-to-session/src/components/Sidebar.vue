<template>
  <div class="sidebar">
    <v-navigation-drawer app mobile-breakpoint="960" class="text-light" color="success" dark>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              <slot></slot>
            </v-list-item-title>
            <v-divider></v-divider>
          </v-list-item-content>      
        </v-list-item>
        <v-list nav>
          <v-list-item v-for="nav_list in nav_lists" :key="nav_list.name" :to="nav_list.link" link>
              <v-list-item-icon>
              <v-icon>{{ nav_list.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ nav_list.name }}</v-list-item-title>
            </v-list-item-content> 
          </v-list-item>
        </v-list>
      </v-navigation-drawer>     
  </div>

</template>

<script>
export default {
  name: 'Sidebar',
  data: () => ({
    nav_lists:[
      {name: '演奏できる曲リスト', icon: 'mdi-playlist-music', link: '/index'},
      {name: 'ユーザを探す', icon: 'mdi-account-search', link: '/userlist'},
      {name: 'ログアウト', icon: 'mdi-logout', link: '/login'},
    ],
  }),
};
</script>

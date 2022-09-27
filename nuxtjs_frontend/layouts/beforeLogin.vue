<template>
  <v-app id="app">
    <v-main>
      <Header></Header>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Header from '~/components/Header.vue'

export default {
  name: 'BeforeLoginLayout',
  data () {
    return {
    }
  }
}
</script>

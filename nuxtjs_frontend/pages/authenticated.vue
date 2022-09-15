<template>
  <div class="authenticated">
    <v-container>
      <v-row class="mx-auto" style="max-width: 750px">
        <v-col cols="12" class="my-6 text-center">
          <p class="text-h5 mb-6">本登録が完了しました</p>
          <v-divider></v-divider>
        </v-col>
        <v-col cols="12" class="mb-6">
          <p class="text-h6">
            この度はご登録いただき、誠にありがとうございます。お客様のアカウントの作成が完了いたしました。<br />
            ログインして、Ready to Sessionをお楽しみください。
          </p>
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
            to="/login"
            >ログインしてはじめる</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "AuthenticatedPage",
  layout: "beforeLogin",
  data: () => ({}),
};
</script>

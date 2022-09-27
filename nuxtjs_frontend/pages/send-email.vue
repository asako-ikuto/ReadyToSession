<template>
  <div class="send-email">
    <v-container>
      <v-row class="mx-auto" style="max-width: 750px">
        <v-col cols="12" class="my-6 text-center">
          <p class="text-h5 mb-6">
            メールアドレス受信確認用のメールを送信しました
          </p>
          <v-divider></v-divider>
        </v-col>
        <v-col cols="12">
          <p class="text-h6">
            メールアドレス{{ email }}へ受信確認用のメールを送信しました。<br />
            メールをご確認いただき、メールに記載されたURLをクリックしてReady to
            Sessionへの登録を完了してください。
          </p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "SendEmailPage",
  layout: "beforeLogin",
  data: () => ({
    email: "",
  }),
};
</script>

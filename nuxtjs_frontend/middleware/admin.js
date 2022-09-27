export default async function ({ redirect, $axios }) {
  try {
    await $axios.get("/admin").then((res) => {
      if (res.data.result !== true) {
        redirect("/login");
      }
    });
  } catch (error) {
    redirect("/login");
  }
}

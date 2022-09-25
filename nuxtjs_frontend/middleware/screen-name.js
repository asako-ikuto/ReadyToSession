export default async function ({ redirect, $axios }) {
  try {
    await $axios.get("/screen-name").then((res) => {
      if (res.data.result == true) {
        redirect("/home");
      } else if (res.data.result == false) {
        redirect("/register-screen-name");
      } else {
        redirect("/login");
      }
    });
  } catch (error) {
    redirect("/login");
  }
}

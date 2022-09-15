export default function ({ $axios, store }) {
  $axios.onRequest((config) => {
    store.dispatch("loading/incrementLoadingCount");
  });

  $axios.onResponse(() => {
    store.dispatch("loading/decrementLoadingCount");
  });

  $axios.onError((e) => {
    store.dispatch("loading/decrementLoadingCount");
  });
}

export default function ({ $axios, app: { store } }) {
  $axios.onRequest((config) => {
    const authHeader = store.getters.getHeaders.headers.Authorization
    if (authHeader) {
      config.headers.common.Authorization = authHeader
    }
  })
}

export default function ({ app, redirect, route, req }) {
  let token = null
  if (process.server) {
    if (req.cookies.get('auth.jwt')) {
      token = req.cookies.get('auth.jwt')
    }
  } else if (process.client) {
    token = app.$cookies.get('auth.jwt')
  }
  if (token === null || token === false || token === undefined) {
    return redirect({
      name: 'login',
      query: {
        redirect: route.fullPath,
      },
    })
  }
}

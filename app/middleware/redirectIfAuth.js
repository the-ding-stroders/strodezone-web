export default function ({ app, redirect, req }) {
  let token = null
  if (process.server) {
    if (req.cookies.get('auth.jwt')) {
      token = req.cookies.get('auth.jwt')
    }
  } else if (process.client) {
    token = app.$cookies.get('auth.jwt')
  }
  if (token && token !== false && token !== undefined) {
    app.store.commit('setToken', token)
    app.store.commit('setHeaders', token)
    if (app.store.state.user) {
      if (app.store.state.user.roles.includes('customer')) {
        return redirect({
          name: 'customer-slug',
          params: { slug: app.store.state.user.username },
        })
      } else if (app.store.state.user.roles.includes('admin')) {
        return redirect({
          name: 'dashboard',
        })
      } else {
        return redirect({
          name: 'index',
        })
      }
    } else {
      return redirect({
        name: 'index',
      })
    }
  }
}

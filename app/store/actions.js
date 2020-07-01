// import axios from 'axios'
// const cookieparser = process.server ? require('cookie-parser') : undefined

export function nuxtServerInit({ commit, rootState }, { req, res }) {
  if (req.cookies.get('auth.jwt')) {
    const jwt = req.cookies.get('auth.jwt')
    commit('setToken', jwt)
    commit('setHeaders', jwt)
  }
}

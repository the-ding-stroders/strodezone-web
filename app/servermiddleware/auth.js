import querystring from 'querystring'
import axios from 'axios'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

const apiBaseUrl = process.env.API_BASE_URL

// Create express router
const router = express.Router()

// Wrapper for making a route async
// https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016
const asyncMiddleware = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
const expressApp = express()
router.use((req, res, next) => {
  Object.setPrototypeOf(req, expressApp.request)
  Object.setPrototypeOf(res, expressApp.response)
  req.res = res
  res.req = req
  next()
})

router.get(
  '/nginx',
  asyncMiddleware(async (req, res) => {
    const parsedQuery = querystring.parse(req._parsedOriginalUrl.query)
    await axios
      .get(`${apiBaseUrl}/streamers?streamKey_eq=${parsedQuery.name}`)
      .then((response) => {
        if (response.data.length === 1) {
          return res.sendStatus(200)
        } else {
          return res.sendStatus(500)
        }
      })
      .catch((e) => {
        return res.sendStatus(500)
      })
  })
)

router.get('/twitch', (req, res) => {
  res.redirect(301, `${apiBaseUrl}/connect/twitch`)
})

router.get('/logout', (req, res) => {
  req.cookies.remove('auth.jwt')
  res.redirect(301, '/')
})

router.get(
  '/twitch/callback',
  asyncMiddleware(async (req, res, next) => {
    await axios
      .get(`${apiBaseUrl}/auth/twitch/callback` + req._parsedOriginalUrl.search)
      .then((response) => {
        req.cookies.set('auth.jwt', response.data.jwt)
        return res.redirect(301, '/')
      })
      .catch((e) => {
        return res.sendStatus(500)
      })
  })
)

export default {
  path: '/auth',
  handler: router,
}

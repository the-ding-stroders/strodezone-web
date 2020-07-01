export default (req, res, next) => {
  req.cookies = require('cookie-universal')(req, res)
  next()
}

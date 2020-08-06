/* eslint-disable no-console */
export default (req, res, next) => {
  console.log(req.url)
  next()
}

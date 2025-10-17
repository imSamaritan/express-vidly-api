function log(req, res, next) {
  //Do logging ...
  console.log("Logging...")
  next()
}

module.exports = log

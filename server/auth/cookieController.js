const cookieController = {};

cookieController.setCookie = (req, res) => {
  res.cookie('token', 'admin', { httpOnly: true, maxAge: 1000})
  res.send(res.locals.id)
}

cookieController.verifyCookie = (req, res, next) => {
  if (!req.cookies.token) {
    console.log('COOKIED EXPIRED')
    console.log(req.baseUrl)
    res.send('expired')
  } else {
    next()
  }
}

module.exports = cookieController

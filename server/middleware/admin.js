module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash('error', 'Sign in first!')
    return res.redirect('/admin/login')
  }
  next()
}



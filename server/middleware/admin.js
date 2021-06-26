// check authentication status
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash('error', 'Sign in first!')
    return res.redirect('/admin/login')
  }
  next()
}

// middleware to restrict from POST request if you aren't admin(in preview mode)
module.exports.roleAdmin = (req, res, next) => {
  if (req.isAuthenticated() && !req.user.isAdmin) {
    req.flash(
      'error',
      `Sorry. You are not Admin, so you can't make any changes!`
    )
    return res.redirect('back')
  }
  next()
}

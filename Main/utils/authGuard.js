const withGuard = (req, res, next) => {
  if (!req.session.logged_in) {
    console.log('Access denied. User not logged in. Redirecting to /login');
    res.redirect('/login');
  } else {
    console.log('Access granted. User is logged in.');
    next();
  }
};

const apiGuard = (req, res, next) => {
  if (!req.session.logged_in) {
    console.log('API access denied. User not logged in.');
    res.status(403).json({ msg: 'You must login to perform this action' });
  } else {
    console.log('API access granted. User is logged in.');
    next();
  }
};

const withoutGuard = (req, res, next) => {
  if (!req.session.logged_in) {
    console.log('User not logged in. Proceeding to the requested route.');
    next();
  } else {
    console.log('User already logged in. Redirecting to the home page.');
    res.redirect('/');
  }
};

module.exports = { withGuard, apiGuard, withoutGuard };

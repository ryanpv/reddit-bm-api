const { getAuth } = require('firebase-admin/auth');

const sessionStart = async (req, res) => {
  try {
      const userAccessToken = req.body.accessToken;
      const verifiedToken = await getAuth().verifyIdToken(userAccessToken);
      const isAdmin = verifiedToken.isAdmin;
      const isRegUser = verifiedToken.isRegUser;
    
      req.session.isAuthenticated = true;
      req.session.user = verifiedToken.email;
      // req.session.displayName = verifiedToken.displayName;
      req.session.uid = verifiedToken.uid;
      req.session.accessToken = verifiedToken.accessToken;
      // console.log('session: ', req.session);
console.log("session started: ", req.session)
      // Set cookie to identify user role right on login
      if (isAdmin) {
        res.cookie('userRole', 'admin', { httpOnly: false });
      } else if (isRegUser) {
        res.cookie('userRole', 'regUser', { httpOnly: false });
      } else {
        res.cookie('userRole', 'null', { httpOnly: false });
      }
  
      res.status(200).send('Session start success!');
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = sessionStart
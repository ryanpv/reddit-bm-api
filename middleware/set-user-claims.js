const { getAuth } = require('firebase-admin/auth');
const { validationResult } = require('express-validator');

const setUserClaims = async (req, res, next) => {
  try {
    const result = validationResult(req)
console.log("user claims page")
    if (result.isEmpty()) {
      const userAccessToken = req.body.accessToken;
      const verifiedToken = await getAuth().verifyIdToken(userAccessToken);
      const user = verifiedToken
    
      if (!verifiedToken.isRegUser) {
        await getAuth()
          .setCustomUserClaims(user.uid, { isRegUser: true });
  
        next();
      } else {
        next();
      }
    } else {
      throw new Error('Input validation FAILED')
    }

  } catch (err) {
    res.status(400).send(err);
  }
};

const userClaims = {
  setUserClaims: setUserClaims,
}

module.exports = userClaims
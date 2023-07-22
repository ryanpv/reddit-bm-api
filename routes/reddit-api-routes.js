const express = require("express");
const redditRouter = express.Router();
const redditClientId = process.env.REDDIT_APP_ID
const redditSecretId = process.env.REDDIT_APP_SECRET

redditRouter.route("/log_callback")
  .get(async (req, res) => {
    const code = req.query.code;
    const buf = Buffer.from(`${redditClientId}:${redditSecretId}`).toString('base64')
    const body = `grant_type=authorization_code&code=${code}&redirect_uri=https://saveredd.onrender.com/log_callback`
    const headers = {
        'Authorization': `Basic ${buf}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*'
    };
  
    try {
      const redditResToken = await axios.post('https://www.reddit.com/api/v1/access_token', body, { headers: headers} )
      .then((res) => res.data) // returns expected response JSON body for tokens, scope, etc...
  
      const reddToken= redditResToken.access_token
      console.log("reddkey", reddToken);
  
      return res
      .cookie("access_token", reddToken, {
        httpOnly: true,
        maxAge: 86400
      })
      .status(200)
      .json({ message: "logged in successfully"})
  
  
  }  catch (err) {
    console.log(err)
    res.send({msg: "something is wrong..."});
    };
  })

module.exports = redditRouter;
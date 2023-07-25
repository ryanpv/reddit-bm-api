const express = require("express");
const redditRouter = express.Router();
const axios = require("axios");
const redditClientId = process.env.REDDIT_APP_ID
const redditSecretId = process.env.REDDIT_APP_SECRET

// Callback route to acquire Reddit auth token
redditRouter.route("/log_callback")
  .get(async (req, res) => {    
    try {
      const code = req.query.code;
      const buf = Buffer.from(`${redditClientId}:${redditSecretId}`).toString('base64')
      const body = `grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:3000/log_callback`
      const headers = {
          'Authorization': `Basic ${buf}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Access-Control-Allow-Origin': '*'
      };
      const redditResToken = await axios.post('https://www.reddit.com/api/v1/access_token', body, { headers: headers} )
      .then((res) => res.data) // returns expected response JSON body for tokens, scope, etc...
  
      req.session.reddit_token = redditResToken.access_token
      res.status(200).send({ message: "logged in successfully"})
  }  catch (err) {
    console.log(err)
    res.send({msg: "something is wrong..."});
    };
  });

redditRouter.route("/saved-reddit-posts")
  .get(async (req, res) => {
    try {
      const redditToken = req.session.reddit_token;

      if(!redditToken) {
        console.log("No reddit token")
        res.status(401).send("Unauthorized request: No reddit token.")
      } else {
        // Fetch reddit profile (username)
        const fetchRedditProfile = await axios.get('https://oauth.reddit.com/api/v1/me', 
        { headers: 
            { 'authorization':`bearer ${ redditToken }`, },
          });
        
        const redditUserName = fetchRedditProfile.data.name;

        // Fetch users saved posts from Reddit
        const fetchUserSavedPosts = await axios.get(`https://oauth.reddit.com/user/${ redditUserName }/saved`,
        { headers: 
          { 'authorization':`bearer ${ redditToken }`, },
          });
        
        const redditFetchResponse = fetchUserSavedPosts.data.data.children                
        res.status(200).send(redditFetchResponse)
      }
    } catch (err) {
      console.log(err.code);
      res.send(err)
    }
  });

module.exports = redditRouter;
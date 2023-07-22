const redditCookieAuth = async (req, res, next) => {
  const reddCookieToken = req.cookies.access_token;
  // console.log("cookie?", reddCookieToken);     reddit token in cookie
  if(!req.session.reddit_token) {
    return console.log("no reddit token avail");
    // res.json({message: "no token avail"})
  }

  try {
    req.thisCookie = reddCookieToken
    
    // req.reddToken = response.access_token;
    // console.log("Reddit API data: ", response);

    // const reddProfile = await axios.get('https://oauth.reddit.com/api/v1/me', 
    //     { headers: {'authorization':`bearer ${response.access_token}`}}
    //     )
    // req.reddUser = reddProfile.data.name;

    next()

}  catch (err) {
  console.log(err)
  res.send({msg: "something is wrong..."});
};
};
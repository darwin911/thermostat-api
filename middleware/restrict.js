const string = "YouLearnMoreFromFailureThanFromSuccess";

const restrict = (req, res, next) => {
  console.log("restrict called");
  const authorizationHeader = req.headers.authorization;
  let token;
  if (authorizationHeader) {
    token = authorizationHeader.split(" ")[1];
    if (token === string) {
      console.log("You are authorized", token);
    } else {
      res.status(401).json({ error: "Failed to authenticate" });
    }
  }
  next();
};

module.exports = restrict;

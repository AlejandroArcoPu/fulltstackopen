const loginRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });

  const passwordValidation = !(user && password)
    ? false
    : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordValidation)) {
    return response.status(401).json({ error: "invalid username or password" });
  }

  const userToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userToken, process.env.SECRET, { expiresIn: 60 * 60 });

  response
    .status(200)
    .json({
      token: token,
      username: user.username,
      name: user.name,
      id: user.id,
    });
});

module.exports = loginRouter;

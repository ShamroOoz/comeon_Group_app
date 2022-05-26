import jwt from "jsonwebtoken";
import players from "../utils/mock-api.js";

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(400).json({ msg: "Invalid Authentication" });

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err)
        return res
          .status(401)
          .json({ success: false, msg: "Authorization not valid." });

      if (user.username in players) {
        const player = Object.assign({}, players[user.username]); //Creating a copy of player
        delete player.password;
        req.user = player;
        next();
      } else {
        throw new Error("Invalid Authentication");
      }
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export default auth;

import jwt from "jsonwebtoken";
import players from "../utils/mock-api.js";

const userCtrl = {
  logoutUser: async (req, res) => {
    try {
      const { username } = req.body;
      if (username in players) {
        res.status(200).json({
          success: true,
          msg: `${username} successfully Logout... `,
        });
      } else {
        throw new Error("Username do not match!");
      }
    } catch (err) {
      return res.status(400).json({ success: false, msg: err.message });
    }
  },
  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password)
        return res
          .status(400)
          .json({ success: false, msg: "Invalid credentials" });

      if (username in players && players[username].password === password) {
        const player = Object.assign({}, players[username]); //Creating a copy of player
        delete player.password;
        // if login success create token
        const payload = { username };
        const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
          expiresIn: "1d",
        });
        return res.status(200).json({
          status: true,
          data: { player, token },
        });
      } else {
        throw new Error("Player does not exist or wrong password");
      }
    } catch (err) {
      return res.status(400).json({ success: false, msg: err.message });
    }
  },
  verifiedToken: (req, res) => {
    try {
      const token = req.header("Authorization");

      if (!token) return res.status(401).send(false);

      jwt.verify(token, process.env.TOKEN_SECRET, async (err, verified) => {
        if (err) return res.status(401).send(false);

        if (verified.username in players) {
          const player = Object.assign({}, players[verified.username]); //Creating a copy of player
          delete player.password;
          return res.status(200).json({ success: true, player });
        }
        return res.status(401).send(false);
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default userCtrl;

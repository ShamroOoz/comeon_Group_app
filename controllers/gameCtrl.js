import fs from "fs";
import pathmodule, { join } from "path";
import { fileURLToPath } from "url";
import { playgameData } from "../utils/mock-api.js";

//
const __filename = fileURLToPath(import.meta.url);
const __dirname = pathmodule.dirname(__filename);
const file = join(__dirname, "../utils", "mock-data.json");

const gameCtrl = {
  getGames: async (req, res) => {
    try {
      console.log(__dirname);
      const gamesData = JSON.parse(fs.readFileSync(file, "utf8"));
      if (!gamesData) {
        throw new Error("Something went Wrong... ");
      }
      res.status(200).json({ success: false, data: gamesData });
    } catch (error) {
      return res.status(400).json({ success: false, msg: error.message });
    }
  },
  playGame: async (req, res) => {
    try {
      const { gameName } = req.params;

      if (!gameName) {
        throw new Error("Something went Wrong...");
      }

      let link = playgameData[gameName].src;

      if (!link) {
        throw new Error("Something went Wrong...");
      }
      return res.status(200).json({ success: true, link });
    } catch (error) {
      return res.status(400).json({ success: false, msg: error.message });
    }
  },
};

export default gameCtrl;

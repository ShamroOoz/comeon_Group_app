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
      const search = req.query["search"] || "";
      const filter = req.query["filter"] || 0;

      const { games, categories } = JSON.parse(fs.readFileSync(file, "utf8"));

      const searchResults = games.filter(
        (gm) =>
          gm.name.toLowerCase().includes(search.toLowerCase()) ||
          gm.description.toLowerCase().includes(search.toLowerCase())
      );

      const filteredResults = searchResults.filter((gm) =>
        gm.categoryIds.includes(+filter)
      );

      console.log(filteredResults.length);
      res.status(200).json({
        success: true,
        data: { games: filteredResults, categories },
      });
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

      const link = playgameData[gameName].src;

      console.log(link);
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

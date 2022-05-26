import { Router } from "express";
import auth from "../middleware/auth.js";
import gameCtrl from "../controllers/gameCtrl.js";

const router = Router();

router.route("/getGames").get(auth, gameCtrl.getGames);

router.route("/play/:gameName").get(auth, gameCtrl.playGame);

export default router;

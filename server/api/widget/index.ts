import * as express from "express";
import Widget from "./widget.model";
import controller from "./widget.controller";
import * as auth from "../../auth/auth.service";
var router = express.Router();

router.get("/:id", auth.isAuthenticated, controller.get);
router.post("/", auth.isAuthenticated, controller.create);
router.delete("/:id", auth.isAuthenticated, controller.remove);
router.put("/", auth.isAuthenticated, controller.update);

module.exports = router;

"use strict";

import * as express from "express";
import {UserController as controller} from "./user.controller";
import * as auth from "../../auth/auth.service";

var router = express.Router();

router.get("/", auth.isAuthenticated, auth.isAdmin, controller.index);
router.get("/public", auth.isAuthenticated, controller.getPublic);
router.delete("/:id", auth.isAuthenticated, auth.isAdmin, controller.destroy);
router.get("/me", auth.isAuthenticated, controller.me);
router.put("/:id/password", auth.isAuthenticated, controller.changePassword);
router.get("id", auth.isAuthenticated, controller.show);
router.post("/", controller.create);

module.exports = router;
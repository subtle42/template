"use strict";

import * as express from "express";
import * as multer from "multer";
import {SourceController as controller} from "./source.controller";
import * as auth from "../../auth/auth.service";

var router = express.Router();

router.post("/create", auth.isAuthenticated, multer({dest: "./uploads"}).single("file"), controller.create);

module.exports = router;

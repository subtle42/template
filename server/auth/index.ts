"use strict";

import * as express from "express";
import User from "../api/user/user.model";
import local from "./local/passport";
import socketSetup from "./socket/setup";

local.setup(User);
// socketSetup.setup();

var router = express.Router();

router.use("/local", local.authenticate);

module.exports = router;
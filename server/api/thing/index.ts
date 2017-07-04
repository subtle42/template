"use strict";

import * as express from "express";
import {ThingController as controller} from "./thing.controller";
var router = express.Router();

router.get('/', controller.index);

module.exports = router;
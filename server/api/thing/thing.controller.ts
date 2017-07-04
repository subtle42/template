"use strict";

import * as express from "express";

export class ThingController {
    public static index(req:express.Request, res:express.Response) {
        console.log("here");
        res.json({
            message:"asdf"
        })
    }
}

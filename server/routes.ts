"use strict";

import * as path from "path";
import * as express from "express";

export default (app:express.Application) => {
    app.use(express.static("../.tmp"));
    app.use("/api/auth", require("./auth"))
    app.use("/api/things", require("./api/thing"));
    app.use("/api/books", require("./api/book"));
    app.use("/api/users", require("./api/user"));

    app.route('/:url(api|auth|components|client)/*');
    app.route("/*")
    .get((req:express.Request, res:express.Response) => {
        res.sendFile(path.resolve("../.tmp/index.html"));
    });
}
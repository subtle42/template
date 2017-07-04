"use strict";

import * as express from "express";
import * as compression from "compression";
import * as bodyParser from "body-parser";
import * as passport from "passport";
import * as session from "express-session";
import * as connectMongo from "connect-mongo";
import * as mongoose from "mongoose";

var mongoStore = connectMongo(session);

export default (app:express.Application) => {
    var env = app.get("env");
    app.use(compression());
    app.use(bodyParser.urlencoded({
        extended:false
    }));
    app.use(bodyParser.json());
    app.use(passport.initialize());

    // app.use(session({
    //     secret: "",
    //     saveUninitialized: true,
    //     resave: false,
    //     store: new mongoStore({
    //         mongooseConnection: mongoose.connection,
    //         db: "mean"
    //     });
    // }))
}
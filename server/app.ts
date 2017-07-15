import * as express from "express";
import * as mongoose from "mongoose";
import * as http from "http";
import * as io from "socket.io";

var mongoUri = "mongodb://localhost/meantest";

(<any>mongoose).connect(mongoUri, {
    useMongoClient: true
});
(<any>mongoose).Promise = global.Promise;
mongoose.connection.on("error", () => {
    console.error("MongoDB connection error!");
    process.exit(-1);
});

var app = express();
var server = http.createServer(app);

declare var global:any;
var myIO = io(server, {});
global.myIO = myIO;

require("./config/express").default(app);
require("./routes").default(app);


setImmediate(() => {
    server.listen(3000, "localhost", () => {
        console.log('Express server listening on %d, in %s mode', 3000, app.get('env'));
    });
});

exports = module.exports = app;
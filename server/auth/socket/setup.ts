import * as jwt from "jsonwebtoken";
import * as config from "../../config/environment/shared";

declare var global:any;
let myIO:SocketIO.Server = global.myIO;

export default class SocketAuth {
    /**
     * Sets up authentication middleware for socket.io
     */
    static setup() {
        myIO.use((socket, next) => {
            
            next();
            // Get token from request
            // let token:string = socket.request;
            // if (!token) next(new Error("Cannot find authorization token"));
            // // Check if token is expired
            // jwt.verify(token, config.shared.secret.session, (err, decoded) => {
            //     // Check if token is valid
            //     if (err) next(new Error("Unable to read token"));
            //     socket.client.request.user = decoded;
            //     next();
            // });
        });
    }
}

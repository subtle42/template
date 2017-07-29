import * as IO from "socket.io";
import * as http from "http";
import {Document, Schema} from "mongoose";

declare var global:any;
let myIO:SocketIO.Server = global.myIO;

export default abstract class BaseSocket {
    protected namespace:SocketIO.Namespace;    

    constructor (
        private name:string,
        private schema:Schema
    ) {
        this.namespace = myIO.of(name);
        this.namespace.on("connection", socket => {
            console.log(`Joined Namespace: ${name}`);
            this.onJoin(socket);
        });
        console.log(`Created Namespace: ${name}`);

        this.schema.post("save", (doc:Document) => {
            console.log("doc", doc);
            this.onAddOrChange(this.getParentId(doc), [doc]);
        });

        this.schema.post("remove", (err, doc) => {
            console.error("err", err);
            console.log("doc", doc);
            this.onDelete(this.getParentId(doc), [doc._id]);
        });
    }

    abstract getParentId(model:Document):string
    
    abstract getInitialState(room:string):Promise<any[]>

    private onJoin(socket:SocketIO.Socket) {
        socket.on("join", (room:string) => {
            socket.leaveAll();
            socket.join(room);
            socket.emit("message", `${this.name.toUpperCase()}, joined room: ${room}`);
            this.getInitialState(room)
            .then(data => this.onAddOrChange(room, data))
        });
    }

    onDelete(room:string, ids:string[]):void {
        this.namespace.in(room).emit("delete", ids);
    }

    onAddOrChange(room:string, items:m.Document[]):void {
        this.namespace.in(room).emit("addedOrChanged", items);
    }

}
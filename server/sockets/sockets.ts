import * as IO from "socket.io";
import * as http from "http";

declare var global:any;
let myIO:SocketIO.Server = global.myIO;

export abstract class BaseSocket {
    protected namespace:SocketIO.Namespace;    

    constructor (
        private name:string
    ) {
        this.namespace = myIO.of(name);
        this.namespace.on("connection", socket => {
            console.log(`Joined Namespace: ${name}`);
            this.onJoin(socket);
        });
        console.log(`Created Namespacke: ${name}`);
    }

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

    onAddOrChange(room:string, items:any[]):void {
        this.namespace.in(room).emit("addedOrChanged", items);
    }

    getInitialState(room:string):Promise<any[]> {
        throw "Not implemented"
    }
}
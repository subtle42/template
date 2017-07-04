import * as $ from "jquery";
import * as io from "socket.io-client";

class Auth {
    constructor() {
    }
}

abstract class BaseSocketService {
    private list:any[] = [];
    private nsp:SocketIOClient.Socket;
    constructor(
        private channel:string
    ) {
        this.nsp = io.connect(`/${channel}`);
        this.nsp.on("deleted", (ids:string[]) => ids.forEach(id => this.onDeleted(id)))
        .on("addedOrChanged", (items:any[]) => items.forEach(item => this.onAddedOrChanged(item)))
        .on("message", (message:string) => console.log(message))
        .on("error", (err:string) => console.error(err));
    }

    get(id:string):any {
        return this.list.filter(x => x._id === id)[0];
    }

    getAll():any[] {
        return this.list;
    }

    joinRoom(room:string) {
        this.nsp.emit("join", room);
    }

    onDeleted(id:string) {
        this.list.forEach((x, index) => {
            if (x._id === id) {
                this.list.splice(index, 1);
            }
        });
    }

    onAddedOrChanged(item:any) {
        let found:number = -1;
        this.list.forEach((x, index) => {
            if (x._id === item._id) {
                found = index;
            }
        });

        if (found !== -1) {
            this.list[found] = item;
        }
        else {
            this.list.push(item);
        }
    }
}

class BookService extends BaseSocketService {
    constructor() {
        super("books");
    }
}

$(document).ready(() =>{
    let service = new BookService();
    service.joinRoom("asdf");
});


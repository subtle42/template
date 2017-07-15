import Book from "./book.model";
import BaseSocket from "../../sockets/sockets";

class BookSocket extends BaseSocket {
    constructor() {
        super("books", Book);
    }

    getParentId(model) {
        return "";
    }

    getInitialState(userId:string) {
        return Book.find({
            $or: [{
                owner: userId
            }, {
                editors: {$elemMatch: { $eq: userId }}
            }, {
                viewers: {$elemMatch: { $eq: userId }}
            }]
        }).exec();
    }
}

new BookSocket();
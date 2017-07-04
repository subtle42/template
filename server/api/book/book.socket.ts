import Book from "./book.model";
import {BaseSocket} from "../../sockets/sockets";

export default class BookSocket extends BaseSocket {
    constructor() {
        super("books");
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
        })
        .then(books => books);
    }
}
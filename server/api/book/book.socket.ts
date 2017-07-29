import Book from "./book.model";
import {Schema} from "mongoose";
import BaseSocket from "../../sockets/sockets";

export default class BookSocket extends BaseSocket {
    constructor(schema:Schema) {
        super("books", schema);
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
};
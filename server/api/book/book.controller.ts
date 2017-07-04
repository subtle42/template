import Book from "./book.model";
import * as express from "express";
import {Util} from "../utils";
import BookSocket from "./book.socket";

let Socket = new BookSocket();

export default class BookController {
    public static create(req:express.Request, res:express.Response):void {
        var myBook = new Book({
            title: req.body.title,
            owner: req.user._id
        });

        myBook.validate()
        .then(() => Book.create(myBook))
        .then(Util.handleNoResult(res))
        .then(Util.handleResponse(res))
        .then(book => Socket.onAddOrChange(req.user._id, [book]))
        .catch(Util.handleError(res));
    }

    public static update(req:express.Request, res:express.Response):void {
        var myId:string = req.body._id;
        delete req.body._id;
        var myBook = new Book(req.body);

        myBook.validate()
        .then(pass => Book.findByIdAndUpdate(myId, myBook))
        .then(Util.handleNoResult(res))
        .then(Util.handleResponseNoData(res))
        .then(book => Socket.onAddOrChange(req.user._id, [book]))
        .catch(Util.handleError(res));
    }

    public static remove(req:express.Request, res:express.Response):void {
        var myId:string = req.params.id;

        Book.findByIdAndRemove(myId)
        .then(() => res.json())
        .then(() => Socket.onDelete(req.user._id, [myId]))
        .catch(Util.handleError(res));
    }

    public static index(req:express.Request, res:express.Response):void {
        let userId:string = req.user._id;
        Book.find({
            $or: [{
                owner: userId
            }, {
                editors: {$elemMatch: { $eq: userId }}
            }, {
                viewers: {$elemMatch: { $eq: userId }}
            }]
        })
        .then(Util.handleResponse(res))
        .catch(Util.handleError(res));
    }
}
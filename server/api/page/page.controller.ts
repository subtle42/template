import * as express from "express";
import Page from "./page.model";
import Util from "../utils";
import "./page.socket";

export class PageController {
    public static create(req:express.Request, res:express.Response):void {
        var myPage = new Page({
            title: req.body.name,
            owner:"daniel",
            bookId: req.body.bookId
        });

        myPage.validate()
        .then(() => Page.create(myPage))
        .then(Util.handleNoResult(res))
        .then(Util.handleResponse(res))
        .catch(Util.handleError(res));
    }

    public static update(req:express.Request, res:express.Response):void {
        var myId:string = req.body._id;
        delete req.body._id;
        var myPage = new Page(req.body);

        myPage.validate()
        .then(() => Page.findByIdAndUpdate(myId, req.body))
        .then(Util.handleNoResult(res))
        .then(Util.handleResponseNoData(res))
        .catch(Util.handleError(res));
    }

    public static remove(req:express.Request, res:express.Response):void {
        var myId:string = req.params.id;
        //TODO: look through pages and widgets and remove first
        var myPage;

        Page.findById(myId)
        .then(page => {
            var myPage = page;
            return page
        })
        .then(page => page.remove())
        // Page.findByIdAndRemove(myId)
        .then(() => res.json())
        // .then(() => myIO.in(myId).emit("delete", myPage.bookId))
        .catch(Util.handleError(res));
    }

    public static index(req:express.Request, res:express.Response):void {
        Page.find({})
        .then(Util.handleResponse(res))
        .catch(Util.handleError(res));
    }
}
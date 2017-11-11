import {Response, Request} from "express";
import Widget from "./widget.model";
import Util from "../utils";

export default class WidgetController {

    static create(req:Request, res:Response) {
        Widget.create({})
        .then(Util.handleResponse(res))
        .catch(Util.handleError(res));
    }

    static remove(req:Request, res:Response) {
        let id = req.params.id;

        Widget.findByIdAndRemove(id).exec()
        .then(Util.handleResponseNoData(res))
        .catch(Util.handleError(res));
    }

    static update(req:Request, res:Response) {
        let myUpdate = req.body;
        let id = myUpdate.id;
        delete myUpdate.id;

        Widget.findByIdAndUpdate(id, myUpdate).exec()
        .then(Util.handleResponse(res))
        .then(Util.handleError(res));
    }

    static get(req:Request, res:Response) {
        let id = req.params.id;

        Widget.find({
            pageId:id
        }).exec()
        .then(Util.handleResponse(res))
        .then(Util.handleError(res));
    }
}
import Page from "./page.model";
import {Schema} from "mongoose";
import {IMongooseModels} from "IMongooseModels";
import BaseSocket from "../../sockets/sockets";

class PageSocket extends BaseSocket {
    constructor(page:Schema) {
        super("pages", page);
    }

    getParentId(model:IMongooseModels.IPageModel) {
        return model.bookId;
    }

    getInitialState(userId:string) {
        return Page.find({
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
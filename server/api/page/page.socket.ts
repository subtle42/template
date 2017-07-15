import Page from "./page.model";
import {IMongooseModels} from "IMongooseModels";
import BaseSocket from "../../sockets/sockets";

class PageSocket extends BaseSocket {
    constructor() {
        super("pages", Page);
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

new PageSocket();
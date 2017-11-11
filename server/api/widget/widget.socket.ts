import Widget from "./widget.model";
import {Schema} from "mongoose";
import BaseSocket from "../../sockets/sockets";
import {IMongooseModels} from "IMongooseModels"

export default class BookSocket extends BaseSocket {
    constructor(schema:Schema) {
        super("widgets", schema);
    }

    getParentId(model:IMongooseModels.IWidgetModel) {
        return model.pageId;
    }

    getInitialState(pageId:string) {
        return Widget.find({
            pageId: pageId
        }).exec();
    }
};
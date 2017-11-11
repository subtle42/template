import * as mongoose from "mongoose";
import {IMongooseModels} from "IMongooseModels";
import WidgetSocket from "./widget.socket";

var WidgetSchema = new mongoose.Schema({
    pageId: {type: String, required: true},
    sourceId: {type: String, required: true},
    groups: [],
    series: []
});

var mySocket = new WidgetSocket(WidgetSchema);
export default mongoose.model<IMongooseModels.IWidgetModel>("Widget", WidgetSchema);
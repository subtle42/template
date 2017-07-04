"use strict";

import * as mongoose from "mongoose";
import {IMongooseModels} from "IMongooseModels";

var PageSchema = new mongoose.Schema({
    title: {type: String, required: true},
    active: {type: Boolean, default: true},
    bookId: {type: String, required:true},
    widgets: {type: [String], default: [], required: true},
    owner: {type: String, required: true},
    editors: {type: [String], default: [], required: true},
    viewers: {type: [String], default: [], required: true}
});

export default mongoose.model<IMongooseModels.IPageModel>("Page", PageSchema);
"use strict";

import * as mongoose from "mongoose";
import {IMongooseModels} from "IMongooseModels";

var SourceSchema = new mongoose.Schema({
    title: {type:String, required:true},
    location: {type:String, required:true},
    size: {type:Number, default: 0},
    rowCount: {type:Number, default: 0},
    columns: {type: [], default: []},
    owner: {type:String, required: true},
    editors: {type:[String], default:[]},
    viewers: {type:[String], default: []},
    isPublic: {type:Boolean, default: false}
});

export default mongoose.model<IMongooseModels.ISourceModel>('Source', SourceSchema);
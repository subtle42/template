import * as mongoose from "mongoose";
import {IMongooseModels} from "IMongooseModels";
import BookSocket from "./book.socket";

var BookSchema = new mongoose.Schema({
    title: {type: String, required: true},
    active: {type: Boolean, default: true},
    pages: [{type: String, required: true}],
    owner: {type: String, required: true},
    editors: [{type: String, required: true}],
    viewers: [{type: String, required: true}]
});

var mySocket = new BookSocket(BookSchema);
export default mongoose.model<IMongooseModels.IBookModel>("Book", BookSchema);
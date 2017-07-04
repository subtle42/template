import {IModels} from "IModels"; 
import {Document} from "mongoose";

export module IMongooseModels {
    export interface IUserModel extends IModels.IUser, Document {
        authenticate(password:string):Promise<IUserModel>,
        makeSalt(byteSize?:number):Promise<string>,
        encryptPassword(password:string):Promise<string>
    }

    export interface IShareModel extends IModels.IShare, Document {}

    export interface ISourceModel extends IModels.ISource, Document {}

    export interface IBookModel extends IModels.IBook, Document {}

    export interface IPageModel extends IModels.IPage, Document {}
}
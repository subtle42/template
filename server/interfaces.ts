export module IModels {
    export type userRole = "admin" | "user";
    export type accessLevel = "owner" | "view" | "edit";
    type authType = 'github' | 'twitter' | 'facebook' | 'google' | 'local';
    export type columnType = "group" | "number" | "text" | "date";

    export interface IShare {
        _id:any;
        owner:string;
        editors:Array<string>;
        viewers:Array<string>;
        isPublic:boolean;
    }

    export interface IUser {
        _id:any;
        email:string;
        name:string;
        password:string;
        role:userRole;
        provider:authType;
        salt:string;
        facebook: object,
        google: object,
        profile:{
            name:string,
            role:string
        },
        token:{
            _id:string,
            role:userRole
        }
    }

    export interface ISourceColumn {
        ref:string;
        title:string;
        type:columnType;
    }

    export interface ISource extends IShare {
        title:string;
        location:string;
        size:number;
        rowCount:number;
        columns:Array<ISourceColumn>;
    }

    export interface IBook extends IShare {
        title:string;
        active:boolean;
        pages:Array<string>;
    }

    export interface IPage extends IShare {
        title:string;
        active:boolean;
        bookId:string;
        widgets:Array<string>;
    }
}
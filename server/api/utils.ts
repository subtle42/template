"use strict";

import * as express from "express";

export class Util {
    public static handleError = (res:express.Response, statusCode?:number):any => {
        statusCode = statusCode || 500;
        return (err) => {
            res.status(statusCode).send(err);
        }
    }

    public static handleNoResult = (res:express.Response):any => {
        return (entity) => {
            if(!entity) {
                res.status(401).end();
                return null;
            }
            return entity;
        }
    }

    public static handleResponse = (res:express.Response, statusCode?:number):any => {
        statusCode = statusCode || 200;
        return (entity:number) => {
            res.status(statusCode).json(entity)
            return entity;
        };
    }

    public static handleResponseNoData = (res:express.Response, statusCode?:number):any => {
        statusCode = statusCode || 200;
        return (entity) => res.status(statusCode).json();
    }
}
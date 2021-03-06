import * as config from "../config/environment/shared";
import * as express from "express";
import * as jwt from "jsonwebtoken";
import * as mongoose from "mongoose";
import {IMongooseModels} from "IMongooseModels";
import {IModels} from "IModels";


/**
 * Checks if user is logged in.
 * @param req 
 * @param res 
 * @param next 
 */
export function isAuthenticated(req:express.Request, res:express.Response, next:express.NextFunction):void {
    let token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({
            message: "No token provided"
        }).end();
    }
    jwt.verify(token, config.shared.secret.session, (err, decoded) => {
        if (err) res.status(403).send("Failed to authenticate token");
        req.user = decoded;
        next();
    });
}

/**
 * Checks if user has access to specific resource before CRUD operation. Must be authenticated.
 * @param model 
 * @param level 
 */
export function hasAccess(model:mongoose.Model<IMongooseModels.IShareModel>, level:IModels.accessLevel) {
    return (req:express.Request, res:express.Response, next:express.NextFunction) => {
        let user = req.user;
        let id = req.params.id || req.body._id;

        if (!user) res.status(403).send("Your JWT has not been checked").end();

        model.findById(id)
        .then(doc => {
            if (!doc) throw `The resource ${model.collection.name.toLocaleUpperCase()}: ${id} does not exist.`;
            else if (user.role === "admin") next();
            else if (doc.owner === user._id) next();
            else if (doc.editors.indexOf(user._id) !== -1 && (level === "view" || level === "edit")) next();
            else if (doc.viewers.indexOf(user._id) !== -1 && level === "view") next();
            else if (doc.isPublic === true && level === "view") next();
            res.status(403).send(`This operation requires ${level.toLocaleUpperCase()} access. You do not have permission.`).end();
        })
        .catch(err => res.status(403).json(err).end())
    };
}


/**
 * Checks if the user role is admin
 * @param req 
 * @param res 
 * @param next 
 */
export function isAdmin(req:express.Request, res:express.Response, next:express.NextFunction) {
    let user = req.user;
    if (!user) {
        res.status(403).send("Your JWT has not been checked").end();
    }
    else if(user.role !== "admin") {
        res.status(403).send(`You are not an ADMIN. Your access is: ${user.role}`).end();
    }
    else {
        next();
    }
}

/**
 * Returns a jwt token signed by the app secret
 * @param id 
 * @param role 
 */
export function signToken(id, role):string {
    let tmp = { _id: id, role: role };
    return jwt.sign(tmp, config.shared.secret.session, {
        expiresIn: 60 * 60 * 5
    });
}

/**
 * Set token cookie directly for oAuth strategies
 * @param req 
 * @param res 
 */
export function setTokenCookie(req, res) {
  if(!req.user) {
    return res.status(404).send('It looks like you aren\'t logged in, please try again.');
  }
  var token = signToken(req.user._id, req.user.role);
  res.cookie('token', token);
  res.redirect('/');
}

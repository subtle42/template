import * as passport from 'passport';
import * as express from "express";
import {signToken} from "../auth.service";
import {Strategy as LocalStrategy} from 'passport-local';

export default class LocalAuth {
    private static localAuthenticate(User, email:string, password:string, done):void {
        User.findOne({
            email:email.toLocaleLowerCase()
        })
        .then(user => {
            if(!user) throw {message: "This email is not registered"};
            return user.authenticate(password)
        })
        .then(user => done(null, user))
        .catch(err => done(err, false));
    }

    static setup(User) {
        passport.use(new LocalStrategy({
            usernameField: "email",
            passwordField: "password"
        }, (email:string, password:string, done:Function) => {
            return this.localAuthenticate(User, email, password, done);
        }));
    }

    static authenticate(req:express.Request, res: express.Response, next: express.NextFunction) {
        passport.authenticate("local", (err, user) => {
            if (err) {
                return res.status(401).json(err);
            }
            if (!user) {
                return res.status(404).json({
                    message: 'Something went wrong, please try again.'
                });
            }
            var token = signToken(user._id, user.role);
            res.json({token});
        })(req, res, next);
    }
}

import {Db, Server} from "mongodb";
import * as request from "request";

const BASE_URL = "http://localhost:3000/api/users";

export default class Util {
    static deleteAllUsers():Promise<void> {
        var myDb = new Db("meantest", new Server("localhost", 27017));
        return myDb.open()
        .then(db => db.collection("users"))
        .then(collection => collection.remove({}))
        .then(docs =>myDb.close());
    }

    static createUser(name:string):Promise<string> {
        return new Promise(resolve => {
            request.post(BASE_URL, {
                form: {
                    name: name,
                    password: name,
                    email: `${name}@test.com`
                }
            },
            (err, res, body) => {
                let token = JSON.parse(res.body).token;
                resolve(token);
            });
        });
    }
}
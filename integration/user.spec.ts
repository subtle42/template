import {} from "jasmine";
import * as request from "request";
import * as jwt from "jsonwebtoken";
import User from "../server/api/user/user.model";
import {Db, Server} from "mongodb";
import * as config from "../server/config/environment/shared";

describe("User API", () => {
    const BASE_URL = "http://localhost:3000/api/users";
    const SECRET_KEY = config.shared.secret.session;
    const DEFAULT_ROLE = "user";
    let myUser = {
        password: "dantheman",
        name: "dantheman",
        email: "dantheman@test.com"
    };

    beforeEach(done => {
        deleteAllUsers()
        .then(() => done())
        .catch(err => console.error(err));
    });

    afterEach(done => {
        deleteAllUsers()
        .then(() => done())
        .catch(err => console.error(err));
    });

    let deleteAllUsers = () => {
        var myDb = new Db("meantest", new Server("localhost", 27017));
        return myDb.open()
        .then(db => db.collection("users"))
        .then(collection => collection.remove({}))
        .then(docs =>myDb.close());
    }

    let createUser = (name:string) => {
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

    describe("get list of all users", () => {
        it("should return 403 if not logged in", done => {
            done();
        });
        it("should return 403 if not logged in as ADMIN", done => {
            done();
        });
    });

    describe("get public list of users", () => {
        it("should return 403 if not logged in", done => {
            request.get(`${BASE_URL}/public`, (err, res, body) => {
                expect(res.statusCode).toEqual(403);
                done();
            });
        });

        it("should return a list of all users in the system", done => {
            const USER_LIST = ["test1", "test2", "test3"];
            
            Promise.all(USER_LIST.map(name => createUser(name)))
            .then(tokens => {
                request.get(`${BASE_URL}/public`, {
                    headers: {
                        "x-access-token": tokens[0]
                    }
                }, (err, res, body) => {
                    expect(res.statusCode).toEqual(200);
                    let users:Array<any> = JSON.parse(body);
                    users.forEach((user, index) => {
                        expect(USER_LIST.indexOf(user.name)).not.toEqual(-1);
                    });
                    done();
                });
            });
        });
    });

    describe("delete user", () => {
        it("should return 403 if not logged in", done => {
            done();
        });
        it("cannot delete user if role is not 'admin'", done => {done();})
        it("can delete another user if role is 'admin'", done => {done();})
    });

    describe("get currently logged in user", () => {
        it("should return 403 if not logged in", done => {
            request.get(`${BASE_URL}/me`, (err, res, body) => {
                expect(res.statusCode).toEqual(403);
                done();;
            })
        });

        it("should return the current user's profile", done => {
            const NAME = "meTest";
            createUser(NAME)
            .then(token => {
                request.get(`${BASE_URL}/me`, {
                    headers: {
                        "x-access-token": token
                    }
                },
                (err, res, body) => {
                    body = JSON.parse(body);
                    expect(res.statusCode).toEqual(200);
                    expect(body.name).toEqual(NAME);
                    done();
                });
            })
        });
    });

    describe("create user", () => {
        it(`should return a token with the role of '${DEFAULT_ROLE}'`, done => {
            request.post(BASE_URL, {
                form: myUser
            },
            (err, res, body) => {
                expect(res.statusCode).toEqual(200);
                let token = JSON.parse(res.body).token;
                jwt.verify(token, SECRET_KEY, (err, decoded) => {
                    if (err) expect("Bad Token").toEqual(token);
                    expect(decoded.role).toEqual(DEFAULT_ROLE)
                    done();
                });
            })
        });
    });
});
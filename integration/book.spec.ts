import * as j from "jasmine-node";
import * as request from "request";
import * as io from "socket.io-client";
import Util from "./util";

const baseUrl = "http://localhost:3000/api/books";

describe("Bookmark API", () => {
    let socket:SocketIOClient.Socket;
    var token:string;

    beforeEach((done) => {
        Util.createUser("test")
        .then(res => {
            token = res;
            socket = io.connect("http://localhost:3000/books");
            socket.on("connect", msg => {
                done();
            })
            .on("addedOrChanged", (items:any[]) => console.log("items:",items))
            .on("message", msg => console.log(msg));
        });
        // Create a least one record;
    });

    afterEach(done => {
        // Remove all records
        socket.disconnect();
        Util.deleteAllUsers()
        .then(() => done());
    });

    describe("GET", () => {

        it("should return a 403 if not logged in", (done) => {
            request.get(baseUrl, (err, res, body) => {
                expect(res.statusCode).toEqual(403);
                console.log("afwe");
                done();
            });
        });

        it("should return a record on success", done => {
            let name = "testbook";
            request.post(baseUrl, {
                headers: {"x-access-token": token},
                form: {
                    title: name
                }
            },
            (err, res, body) => {
                expect(err).toEqual(undefined);
                body = JSON.parse(body);
                expect(body).not.toEqual(undefined);
                expect(body.title).toEqual(name)
                done();
            });
        });

        it("should broadcast an object on addedOrChanged", done => {
            socket.on("addedOrChanged", msg => {
                console.log(msg);
                // done();
            });
            let name = "testbook";
            request.post(baseUrl, {
                headers: {"x-access-token": token},
                form: {
                    title: name
                }
            },
            (err, res, body) => {
                done();
            });
        })
    });

    describe("PUT", () => {
        it("should return a 403 if not logged in", (done) => {
            request.get(baseUrl, (err, res, body) => {
                expect(res.statusCode).toEqual(403);
                done();
            });
        });
    });

    describe("POST", () => {
        it("should return a 403 if not logged in", (done) => {
            request.get(baseUrl, (err, res, body) => {
                expect(res.statusCode).toEqual(403);
                done();
            });
        });
    });

    describe("DELETE", () => {
        it("should return a 403 if not logged in", (done) => {
            request.get(baseUrl, (err, res, body) => {
                expect(res.statusCode).toEqual(403);
                done();
            });
        });
    });
});
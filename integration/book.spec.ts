import * as j from "jasmine-node";
import * as request from "request";

const baseUrl = "http://localhost:3000/api/books";

describe("Bookmark API", () => {
    beforeEach(() => {
        // Create a least one record;
    });

    afterEach(() => {
        // Remove all records
    });

    describe("GET", () => {

        it("should return a 403 if not logged in", (done) => {
            request.get(baseUrl, (err, res, body) => {
                expect(res.statusCode).toEqual(403);
                console.log("afwe");
                done();
            });
        });
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
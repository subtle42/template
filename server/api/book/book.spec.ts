import * as req from "request";
import {} from "jasmine";

let url = "localhost:3000/api/books"

describe("Books route", () => {
    beforeEach(() => {

    });

    describe("POST", () => {
        it("should be a success", (done) => {
            req.post(url, {
                body: {
                    title: "test"
                }
            }, (err, res, body) => {
                expect(res.statusCode).toEqual(200);
                console.log(err);
                done();
            })
        })
    });
})
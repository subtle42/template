import {} from "jasmine";
import * as request from "request";


describe("User API", () => {
    const baseUrl = "http://localhost:3000/api/users";

    beforeEach(() => {
        console.log("in beforeEach");
    });

    afterEach(() => {});
    
// router.get("/", auth.isAuthenticated, auth.isAdmin, controller.index);
// router.get("/public", auth.isAuthenticated, controller.getPublic);
// router.delete("/:id", auth.isAuthenticated, auth.isAdmin, controller.destroy);
// router.get("/me", auth.isAuthenticated, controller.me);
// router.put("/:id/password", auth.isAuthenticated, controller.changePassword);
// router.get("id", auth.isAuthenticated, controller.show);
// router.post("/", controller.create);

    describe("get list of all users", () => {
        it("should return 403 if not logged in", (done) => {
            done();
        });
        it("should return 403 if not logged in as ADMIN", (done) => {
            done();
        });
    });

    describe("get public list of users", () => {
        it("should return 403 if not logged in", (done) => {
            done();            
        })
        it("should return a list of all users in the system", (done) => {
            done();
        })
    });

    describe("delete user", () => {
        it("should return 403 if not logged in", (done) => {done();})
        it("should return 403 if not logged in as ADMIN", (done) => {done();})
        it("should delete the record from USERS", (done) => {done();})
    });

    describe("GET /me", () => {
        it("should return 403 if not logged in", (done) => {done();})
        it("should return the current user's profile", (done) => {done();})
    });

    describe("create user", () => {
        it("should return a token", (done) => {
            let body = {
                password: "test",
                name: "test",
                email: "test@test.com"
            };

            request.post(baseUrl, {
                form: body
            },
            (err, res, body) => {
                console.log(err);
                console.log(res.statusCode);
                console.log(res.body);
                done();
            })
        });
    });
});
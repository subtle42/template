import * as express from "express";
import Book from "./book.model";
import controller from "./book.controller";
import * as auth from "../../auth/auth.service";
var router = express.Router();


router.get("/", auth.isAuthenticated, controller.index);
router.post("/", auth.isAuthenticated, controller.create);
router.delete("/:id", auth.isAuthenticated, auth.hasAccess(Book, "owner"), controller.remove);
router.put("/", auth.isAuthenticated, auth.hasAccess(Book, "edit"), controller.update);

module.exports = router;

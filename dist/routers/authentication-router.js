"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationRouter = void 0;
const authentication_controllers_1 = require("../controllers/authentication-controllers");
const middlewares_1 = require("../middlewares");
const authentication_schemas_1 = require("../schemas/authentication-schemas");
const express_1 = require("express");
const authenticationRouter = (0, express_1.Router)();
exports.authenticationRouter = authenticationRouter;
authenticationRouter.post("/sign-up", (0, middlewares_1.validateBody)(authentication_schemas_1.SignUpSchema), authentication_controllers_1.SignUpController);
authenticationRouter.post("/sign-in", (0, middlewares_1.validateBody)(authentication_schemas_1.SignInSchema), authentication_controllers_1.LoginController)
    .all("/log-out*", middlewares_1.authenticateToken);
authenticationRouter.post("/log-out", authentication_controllers_1.LogOutController);

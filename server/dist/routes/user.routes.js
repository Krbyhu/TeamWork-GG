"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const verifyToken_1 = require("../lib/verifyToken");
const router = express_1.Router();
router.route('/')
    .post(user_controller_1.signin);
router.route('/register')
    .post(user_controller_1.signup);
router.route('/profile/:id')
    .get(verifyToken_1.tokenValidation, user_controller_1.profile)
    .put(verifyToken_1.tokenValidation, user_controller_1.profileUpdate);
exports.default = router;

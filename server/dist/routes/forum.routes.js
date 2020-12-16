"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const forum_controller_1 = require("../controllers/forum.controller");
const verifyToken_1 = require("../lib/verifyToken");
const router = express_1.Router();
router.route('/')
    .get(verifyToken_1.tokenValidation, forum_controller_1.forumList);
router.route('/new')
    .get(verifyToken_1.tokenValidation, forum_controller_1.getID)
    .post(verifyToken_1.tokenValidation, forum_controller_1.newPost);
exports.default = router;

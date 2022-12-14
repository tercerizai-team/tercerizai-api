"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createUserFeedback_controller_1 = require("../controllers/usersFeedbacks/createUserFeedback.controller");
const deleteUserFeedback_controller_1 = require("../controllers/usersFeedbacks/deleteUserFeedback.controller");
const listUserFeedbacks_controller_1 = require("../controllers/usersFeedbacks/listUserFeedbacks.controller");
const updateUserFeedback_controller_1 = require("../controllers/usersFeedbacks/updateUserFeedback.controller");
const authUser_middleware_1 = require("../middlewares/authUser.middleware");
const isAdm_middleware_1 = require("../middlewares/isAdm.middleware");
const usersFeedbacksRoutes = (0, express_1.Router)();
usersFeedbacksRoutes.post('', authUser_middleware_1.authUserMiddleware, createUserFeedback_controller_1.createUserFeedbackController);
usersFeedbacksRoutes.get('/:id', authUser_middleware_1.authUserMiddleware, listUserFeedbacks_controller_1.listUserFeedbacksController);
usersFeedbacksRoutes.patch('/:id', authUser_middleware_1.authUserMiddleware, isAdm_middleware_1.isAdmMiddleware, updateUserFeedback_controller_1.updateUserFeedbackController);
usersFeedbacksRoutes.delete('/:id', authUser_middleware_1.authUserMiddleware, isAdm_middleware_1.isAdmMiddleware, deleteUserFeedback_controller_1.deleteUserFeedbackController);
exports.default = usersFeedbacksRoutes;

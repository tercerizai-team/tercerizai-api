import { Router } from "express";
import createAddressesController from "../controllers/addresses/createAddresses.controller";
import { deleteAddressController } from "../controllers/addresses/deleteAddress.controller";
import { authUserMiddleware } from "../middlewares/authUser.middleware";
import { isTheOwnerOrAdmMiddleware } from "../middlewares/isTheOwnerOrAdm.middleware";

const addressesRoutes = Router();

addressesRoutes.post("", authUserMiddleware, createAddressesController);
addressesRoutes.delete("/:id", authUserMiddleware, deleteAddressController);

export default addressesRoutes;

import { Router } from "express";
import { createCategoryController } from "../controllers/categories/createCategory.controller";
import { deleteCategoryController } from "../controllers/categories/deleteCategory.controller";
import { editCategoryController } from "../controllers/categories/editCategory.controller";
import { getCategoryController } from "../controllers/categories/getCategory.controller";
import { listCategoriesController } from "../controllers/categories/listCategories.controller";
import { authUserMiddleware } from "../middlewares/authUser.middleware";
import { isAdmMiddleware } from "../middlewares/isAdm.middleware";
import { isTheOwnerOrAdmMiddleware } from "../middlewares/isTheOwnerOrAdm.middleware";

const categoriesRoutes = Router()

categoriesRoutes.post("", authUserMiddleware, isAdmMiddleware, createCategoryController)
categoriesRoutes.get("", listCategoriesController)
categoriesRoutes.get("/:id", getCategoryController)
categoriesRoutes.delete("/:id", authUserMiddleware, isAdmMiddleware, deleteCategoryController)
categoriesRoutes.patch("/:id", authUserMiddleware, isAdmMiddleware, editCategoryController)

export default categoriesRoutes
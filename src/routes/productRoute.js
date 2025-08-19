import express from "express";
import multer from "multer";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getCategories,
  getProductById,
  getProductsByUser,
  updateProduct,
  getProductsByCategory,
  getProductsByBrand,
  getBrands,
} from "../controllers/productController.js";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { ROLE_ADMIN, ROLE_MERCHANT } from "../constants/roles.js";

const router = express.Router();

// 🔹 Multer config (store in memory or disk, adjust as you need)
const storage = multer.memoryStorage(); // or multer.diskStorage({...})
const upload = multer({ storage });

/**
 * URL: /api/products
 * Method: GET
 * Get all products
 */
router.get("/", getAllProducts);

// /api/products/users
router.get("/users", auth, getProductsByUser);

router.get("/categories", getCategories);
router.get("/brands", getBrands);

router.get("/category/:category", getProductsByCategory);
router.get("/brand/:brand", getProductsByBrand);

/**
 * URL: /api/products/:id
 * Method: GET
 * Get product by id
 */
router.get("/:id", getProductById);

/**
 * URL: /api/products
 * Method: POST
 * Create product
 * (with up to 5 images)
 */
router.post(
  "/",
  auth,
  roleBasedAuth(ROLE_MERCHANT),
  upload.array("images", 5),
  createProduct
);

/**
 * URL: /api/products/:id
 * Method: PUT
 * Update product
 * (optionally with images)
 */
router.put(
  "/:id",
  auth,
  roleBasedAuth(ROLE_MERCHANT),
  upload.array("images", 5),
  updateProduct
);

/**
 * URL: /api/products/:id
 * Method: DELETE
 * Delete product
 */
router.delete("/:id", auth, roleBasedAuth(ROLE_ADMIN), deleteProduct);

export default router;

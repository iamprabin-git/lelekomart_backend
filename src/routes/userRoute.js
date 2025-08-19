import express from "express";
import multer from "multer";
import {
  createMerchant,
  createUser,
  deleteUser,
  getAllCustomers,
  getAllUsers,
  getUserById,
  updateUser,
  uploadProfileImage,
} from "../controllers/userController.js";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { ROLE_ADMIN, ROLE_MERCHANT } from "../constants/roles.js";

const router = express.Router();

// 🔹 Multer config for profile images
const storage = multer.memoryStorage(); // or diskStorage if you want local files
const upload = multer({ storage });

// /api/users
router.post("/", createUser);

// /api/users/merchant
router.post("/merchant", auth, roleBasedAuth(ROLE_ADMIN), createMerchant);

// /api/users/:id
router.put("/:id", auth, updateUser);

// /api/users/:id
router.delete("/:id", auth, roleBasedAuth(ROLE_ADMIN), deleteUser);

router.get("/", auth, roleBasedAuth(ROLE_ADMIN), getAllUsers);

router.get("/customers", auth, roleBasedAuth(ROLE_MERCHANT), getAllCustomers);

router.get("/:id", auth, getUserById);

/**
 * Profile image upload
 * (expects form-data with key: "image")
 */
router.put(
  "/profile/upload",
  auth,
  upload.single("image"), // 🔹 multer middleware
  uploadProfileImage
);

router.put(
  "/:id/profile-image",
  auth,
  upload.single("image"), // 🔹 multer middleware
  uploadProfileImage
);

export default router;

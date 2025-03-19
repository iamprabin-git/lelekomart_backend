// Database related tasks
import Product from "../models/Product.js";

const getAllProducts = async () => {
  const products = await Product.find();

  return products;
};

const getProductById = async (id) => {
  const product = await Product.findById(id);

  return product;
};

const createProduct = async (data, userId) => {
  return await Product.create({ ...data, createdBy: userId });
};

const updateProduct = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data, {
    new: true,
  });
};

const deleteProduct = async (id) => {
  await Product.findByIdAndDelete(id);
};

const getCategories = async () => {
  return await Product.distinct("category");
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
};

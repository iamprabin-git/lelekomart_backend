// Database related tasks
import Product from "../models/Product.js";

// 1. Sort: {fieldName:ORDER} for e.g {price: -1} 1: ASC | -1: DESC
// 2. Limit: Max no. of items

const getAllProducts = async (query, userId) => {
  const sort = JSON.parse(query.sort || "{}");
  const limit = query.limit;
  const offset = query.offset;
  const filters = {};

  const { category, brands, name, min, max } = query;

  if (category) filters.category = category;
  if (brands) {
    const brandItems = brands.split(",");
    filters.brand = { $in: brandItems };
  }
  if (name) {
    filters.name = { $regex: name, $options: "i" };
  }
  if (min) filters.price = { $gte: parseFloat(min) };
  if (max)
    filters.price = {
      ...filters.price,
      $lte: parseFloat(max),
    };

  if (userId) filters.createdBy = userId;

  const products = await Product.find(filters)
    .sort(sort)
    .limit(limit)
    .skip(offset);

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

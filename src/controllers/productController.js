import productService from "../services/productService.js";

const getAllProducts = (req, res) => {
  const products = productService.getAllProducts();

  res.json(products);
};

const getProductById = (req, res) => {
  const id = req.params.id;

  const product = productService.getProductById(id);

  if (!product) res.status(404).send("Product not found.");

  res.json(product);
};

const createProduct = (req, res) => {
  const data = productService.createProduct(req.body);

  res.send(data);
};

const updateProduct = (req, res) => {
  res.send("update products");
};

const deleteProduct = (req, res) => {
  res.send("delete products");
};

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

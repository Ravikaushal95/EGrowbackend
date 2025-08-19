const Product = require('../models/productModel');
const path = require('path');

exports.addProduct = async (req, res) => {
  try {
    const { title, desc, price, categoryId } = req.body;

    if (!req.files || !req.files.image) {
      return res.status(400).json({ success: false, message: "Image file required" });
    }

    const imageFile = req.files.image;
    const fileName = Date.now() + path.extname(imageFile.name);
    const uploadPath = path.join(__dirname, '..', 'uploads', fileName);

    imageFile.mv(uploadPath, async (err) => {
      if (err) return res.status(500).json({ message: "Image upload failed" });

      const newProduct = new Product({
        title,
        desc,
        price,
        categoryId,
        image: `/upload/${fileName}`
      });

      await newProduct.save();
      res.status(201).json({ success: true, message: "Product added" });
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('categoryId', 'name');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.find({ categoryId: id });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'No products found for this category.' });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

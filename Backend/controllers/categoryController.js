const Category = require('../models/categoryModel');
const path = require('path');
const fs = require('fs');

// Add Category
exports.addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!req.files || !req.files.image) {
      return res.status(400).json({ success: false, message: "Image file is required" });
    }

    const imageFile = req.files.image;
    const fileName = Date.now() + path.extname(imageFile.name);
    const uploadPath = path.join(__dirname, '..', 'uploads', fileName);

    // Move file to uploads folder
    imageFile.mv(uploadPath, async (err) => {
      if (err) return res.status(500).json({ success: false, message: "Image upload failed" });

      const category = new Category({
        name,
        image: `/upload/${fileName}`, // This matches your static route
      });

      await category.save();
      res.status(201).json({ success: true, message: 'Category added successfully' });
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get All Categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
};

// Delete Category
exports.deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    // Delete the image from the file system
    const imagePath = path.join(__dirname, '..', category.image); // assuming /upload/filename
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // Delete category from DB
    await Category.findByIdAndDelete(categoryId);

    res.json({ success: true, message: 'Category deleted successfully' });

  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ success: false, message: 'Server error while deleting category' });
  }
};

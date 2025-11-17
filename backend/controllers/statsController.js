const Product = require('../models/productModel');

exports.getStats = async (req, res) => {
  try {

    const productCount = await Product.countDocuments();

    res.status(200).json({
      success: true,
      stats: {
        productCount,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
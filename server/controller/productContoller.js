const slugify = require('slugify');
const productModel = require('../models/productModel');
const categoryModel = require('../models/categoryModel');
const userModel = require('../models/userModel');
const fs = require('fs');
const mongoose = require('mongoose');
const createProductController = async (req, res) => {
  try {
    console.log(req.fields);
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing product",
    });
  }
};

//get all products
const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "ALlProducts ",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};
// get single product
const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single product",
      error,
    });
  }
};

// get photo
const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

//delete controller
const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

//upate producta
const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    console.log(req.fields);
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};


const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};

// product count
const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

// product list base on page
const productListController = async (req, res) => {
  try {
    const perPage = 12;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

//Search Product Controller
const searchController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(resutls);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
}

//Similar Product Controller
const realtedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};

//Category controller
const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};
// const getProductAverageRating = async (req, res) => {
//   const { productId } = req.body;

//   if (!productId) {
//     return res.status(400).json({
//       success: false,
//       message: 'ProductId is required in the request body',
//     });
//   }

//   try {
//     const result = await productModel.findOne({ _id: productId });

//     if (!result) {
//       return res.status(404).json({
//         success: false,
//         message: 'Product not found',
//       });
//     }

//     const ratings = result.ratings || [];

//     const averageRating = ratings.length > 0 ? +(ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length).toFixed(2) : 0;
//     const messages = ratings.map(rating => rating.message).filter(Boolean);

//     if (ratings.length === 0) {
//       return res.status(204).send();
//     }

//     return res.status(200).json({
//       success: true,
//       averageRating: averageRating,
//       messages: messages,
//       message: messages.length > 0 ? 'Product has ratings and messages' : 'Product has no ratings or messages',
//     });

//   } catch (error) {
//     console.error('Error fetching product average rating:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Internal server error',
//     });
//   }
// };
const getProductAverageRating = async (req, res) => {
  const { productId } = req.query;
  console.log("reached");
  console.log(req.body);
  console.log(req.query);
  console.log(req.params);

  if (!productId) {
    console.log("yahi wala")
    return res.status(400).json({
      success: false,
      message: 'ProductId is required in the request body',
    });
  }

  try {
    const result = await productModel.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId.createFromHexString(productId),
        },
      },
      {
        $project: {
          ratings: {
            $map: {
              input: "$ratings",
              as: "rating",
              in: {
                rating: "$$rating.rating",
                message: "$$rating.message",
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 0, // Exclude _id field
          averageRating: { $avg: "$ratings.rating" },
          messages: "$ratings",
        },
      },
    ]);

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    const averageRating = +(result[0].averageRating.toFixed(2));
    const messages = result[0].messages;

    if (isNaN(averageRating)) {
      return res.status(204).send();
    }

    return res.status(200).json({
      success: true,
      averageRating: averageRating,
      messages: messages,
      message: messages.length > 0 ? 'Product has ratings and messages' : 'Product has no ratings or messages',
    });

  } catch (error) {
    console.error('Error fetching product average rating:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};


const addProductRating = async (req, res) => {
  const { productId, rating, message } = req.body;
  console.log(productId);
  try {
    const userId = req.user._id
    const product = await productModel.findById(productId);

    if (!product) {
      console.log("nahi mila");
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      console.log("user nahi mila");

      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const existingRatingIndex = product.ratings.findIndex(
      (r) => r.userId.toString() === userId
    );

    if (existingRatingIndex !== -1) {
      product.ratings[existingRatingIndex].rating = rating;
      product.ratings[existingRatingIndex].message = message;
    } else {
      product.ratings.push({
        userId: userId,
        rating: rating,
        message: message,
      });
    }

    await product.save();

    return res.status(200).json({
      success: true,
      message: 'Rating added or modified successfully',
    });

  } catch (error) {
    console.error('Error adding/modifying product rating:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

module.exports = { addProductRating, getProductAverageRating, productCategoryController, realtedProductController, searchController, productFiltersController, productCountController, productListController, createProductController, updateProductController, deleteProductController, getProductController, getSingleProductController, productPhotoController };
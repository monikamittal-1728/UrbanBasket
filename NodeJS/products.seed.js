import mongoose from "mongoose";
import Product from "./Model/product.model.js"; // adjust path as needed

const seedProducts = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/urbanbasket");
    console.log("Connected to MongoDB");

    const response = await fetch("https://dummyjson.com/products?limit=194");
    const data = await response.json();

    const products = data.products.map((p) => ({
      name: p.title,
      title: p.title,
      description: p.description,
      category: p.category,
      brand: p.brand,
      sku: p.sku,
      price: p.price,
      discountPercentage: p.discountPercentage,
      stock: p.stock,
      rating: p.rating,
      thumbnail: p.thumbnail,
      images: p.images,
      warrantyInformation: p.warrantyInformation,
      shippingInformation: p.shippingInformation,
      returnPolicy: p.returnPolicy,
      reviews: p.reviews.map((r) => ({
        reviewerName: r.reviewerName,
        rating: r.rating,
        comment: r.comment,
        date: r.date,
      })),
    }));

    await Product.deleteMany();
    await Product.insertMany(products);
    console.log(`✅ ${products.length} products inserted`);

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
};

seedProducts();

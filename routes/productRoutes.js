import express from "express";

import {getAllProducts}  from "../controllers/FetchProduct.js";

const router = express.Router();

// // Add a product
// router.post("/", async (req, res) => {
//   try {
//     const products = req.body; // Expecting an array of product objects
//     const savedProducts = await Product.insertMany(products);
//     console.log("Product added:");
//     res.status(201).json(savedProducts );
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// Get all products
router.get("/", getAllProducts);

export default router;

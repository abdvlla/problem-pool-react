import express from "express";
import { Pool } from "../models/pool.js";
const router = express.Router();

// Helper function to log request body
function logRequestBody(body) {
  console.log("Request Body:", JSON.stringify(body, null, 2));
}

// Save images to the pool
function saveImages(pool, coversEncoded, removeCover) {
  if (removeCover) {
    pool.images = [];
    return;
  }

  if (!coversEncoded) return;

  try {
    const covers = Array.isArray(coversEncoded)
      ? coversEncoded
      : [coversEncoded];

    const newImages = covers
      .map((coverEncoded) => {
        const cover = JSON.parse(coverEncoded);
        if (cover != null && imageMimeTypes.includes(cover.type)) {
          return {
            image: Buffer.from(cover.data, "base64"),
            imageType: cover.type,
          };
        }
      })
      .filter(Boolean);

    pool.images = pool.images.concat(newImages);
  } catch (err) {
    console.error("Error parsing cover data", err);
  }
}

// Get all pools with optional filters
router.get("/", async (req, res) => {
  try {
    const pools = await Pool.find({});

    return res.status(200).json({
      count: pools.length,
      data: pools,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Create a new pool
router.post("/", async (req, res) => {
  logRequestBody(req.body); // Log the request body

  const newPool = new Pool({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    number: req.body.number,
    email: req.body.email,
    altNumber: req.body.altNumber,
    altEmail: req.body.altEmail,
    bodyOfWater: req.body.bodyOfWater,
    status: req.body.status,
    description: req.body.description,
    system: req.body.system,
    pump: req.body.pump,
    filter: req.body.filter,
    heater: req.body.heater,
    hhlBuild: req.body.hhlBuild,
    size: req.body.size,
    otherEquipment: req.body.otherEquipment,
    brand: req.body.brand,
    make: req.body.make,
    assignedTo: req.body.assignedTo,
    condition: req.body.condition,
  });

  // saveImages(newPool, req.body.images);

  try {
    const pool = await Pool.create(newPool);
    return res.status(201).send(pool);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Failed to create pool" });
  }
});

// Get a specific pool by ID
router.get("/:id", async (req, res) => {
  try {
    const pool = await Pool.findById(req.params.id).exec();
    if (!pool) {
      return res.status(404).json({ error: "Pool not found" });
    }
    res.json(pool);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch pool" });
  }
});

// Update a specific pool by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Pool.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: "Body of water not found" });
    }

    return res
      .status(200)
      .send({ message: "Body of water updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Delete a specific pool by ID
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Pool.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Pool not found" });
    }

    return response.status(200).send({ message: "Pool deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;

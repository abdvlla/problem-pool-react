import express from "express";
import { Pool } from "../models/pool.js";
const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"];

const router = express.Router();

// Save images to the pool
function saveImages(pool, coversEncoded, removeCover) {
  if (removeCover && Array.isArray(removeCover)) {
    pool.images = pool.images.filter(
      (img) =>
        !removeCover.includes(
          `data:${img.imageType};base64,${img.image.toString("base64")}`
        )
    );
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
    const pools = await Pool.find({})
      .sort({ updatedAt: -1 })
      .select(
        "firstName lastName email number assignedTo status updatedAt todaysList"
      );

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
    conditionPool: req.body.conditionPool,
    conditionHt: req.body.conditionHt,
    todaysList: req.body.todaysList,
  });

  saveImages(newPool, req.body.images, req.body.removeCover);

  try {
    const pool = await Pool.create(newPool);
    return res.status(201).send(pool);
  } catch (err) {
    console.error(err.message);
    res
      .status(400)
      .json({ error: "Failed to create pool", details: err.message });
  }
});

// Get a specific pool by ID
router.get("/:id", async (req, res) => {
  try {
    const pool = await Pool.findById(req.params.id);
    if (!pool) {
      return res.status(404).json({ error: "Pool not found" });
    }
    res.json(pool);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch pool" });
  }
});

router.put("/bulk-update", async (req, res) => {
  try {
    const { ids, assignedTo, todaysList } = req.body;

    const updateData = {};
    if (assignedTo !== undefined) {
      updateData.assignedTo = assignedTo;
    }
    if (todaysList !== undefined) {
      updateData.todaysList = todaysList;
    }

    await Pool.updateMany({ _id: { $in: ids } }, { $set: updateData });

    return res.status(200).send({ message: "Pools updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Update a specific pool by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await Pool.findById(id);
    if (!pool) {
      return res.status(404).json({ message: "Body of water not found" });
    }

    const { images, removedImages, ...otherData } = req.body;
    Object.assign(pool, otherData);
    saveImages(pool, images, removedImages);

    await pool.save();

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

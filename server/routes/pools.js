import express from "express";
import { Pool } from "../models/pool.js";
import sharp from "sharp";

const router = express.Router();
const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"];

// Save images to the pool
async function saveImages(pool, coversEncoded, removeCover) {
  if (removeCover) {
    pool.images = pool.images.filter(
      (img) =>
        !removeCover.includes(
          `data:${img.imageType};base64,${img.image.toString("base64")}`
        )
    );
  }

  if (!coversEncoded) return;

  const covers = Array.isArray(coversEncoded) ? coversEncoded : [coversEncoded];
  const newImagesPromises = covers.map(async (coverEncoded) => {
    const cover = JSON.parse(coverEncoded);
    if (cover && imageMimeTypes.includes(cover.type)) {
      const resizedImage = await sharp(Buffer.from(cover.data, "base64"))
        .resize({ width: 800, height: 800, fit: sharp.fit.inside })
        .webp({ quality: 80 })
        .toBuffer();

      return {
        image: resizedImage,
        imageType: "image/webp",
      };
    }
  });

  const newImages = (await Promise.all(newImagesPromises)).filter(Boolean);

  pool.images = pool.images.concat(newImages);
}

// Get all pools
router.get("/", async (req, res) => {
  try {
    const pools = await Pool.find({})
      .sort({ updatedAt: -1 })
      .select(
        "firstName lastName email number assignedTo status updatedAt todaysList"
      )
      .allowDiskUse(true);

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
  const newPool = new Pool(req.body);
  await saveImages(newPool, req.body.images, req.body.removeCover);

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

// Bulk update pools
router.put("/bulk-update", async (req, res) => {
  try {
    const { ids, ...updateData } = req.body;
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
    await saveImages(pool, images, removedImages);
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
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Pool.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Pool not found" });
    }
    return res.status(200).send({ message: "Pool deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;

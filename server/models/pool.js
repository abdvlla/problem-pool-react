import mongoose from "mongoose";

const poolSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  number: String,
  email: String,
  altNumber: String,
  altEmail: String,
  bodyOfWater: String,
  status: String,
  description: String,
  images: [
    {
      image: Buffer,
      imageType: String,
    },
  ],
  system: String,
  pump: String,
  filter: String,
  heater: String,
  size: String,
  otherEquipment: String,
  hhlBuild: String,
  brand: String,
  make: String,
  assignedTo: String,
  condition: String,
});

poolSchema.virtual("coverImagePath").get(function () {
  if (this.images != null && this.images.length > 0) {
    return this.images.map(
      (img) =>
        `data:${img.imageType};charset=utf-8;base64,${img.image.toString(
          "base64"
        )}`
    );
  }
  return [];
});

export const Pool = mongoose.model("Pool", poolSchema);

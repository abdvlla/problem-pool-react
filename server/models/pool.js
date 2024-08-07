import mongoose from "mongoose";

const poolSchema = new mongoose.Schema(
  {
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
    conditionPool: String,
    conditionHt: String,
    todaysList: String,
    priority: String,
    street: String,
    town: String,
    chlorineDemand: Boolean,
  },
  { timestamps: true }
);

poolSchema.virtual("coverImagePath").get(function () {
  if (this.images != null && this.images.length > 0) {
    return this.images.map(
      (img) => `data:${img.imageType};base64,${img.image.toString("base64")}`
    );
  }
  return [];
});

poolSchema.set("toJSON", { virtuals: true });
poolSchema.set("toObject", { virtuals: true });

poolSchema.index({ updatedAt: -1 });

export const Pool = mongoose.model("Pool", poolSchema);

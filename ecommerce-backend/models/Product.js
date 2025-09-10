import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    image: String,
    // Optionally, multiple images can be stored in an array:
    images: [String],
    category: { type: String, required: true },
    availableSizes: [String],
    availableColors: [String],
    isCustomizable: { type: Boolean, default: false },
    // Optional flags for enabling text or image customization:
    allowTextCustomization: { type: Boolean, default: false },
    allowImageUpload: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
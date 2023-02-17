import mongoose from "mongoose";

export interface ReviewDoc extends Document {
  name: string;
  rating: number;
  comment: string;
  title: string;
  user: mongoose.Schema.Types.ObjectId;
}

export interface ProductDoc extends Document {
  name: string;
  image: string;
  brand: string;
  rating: number;
  category: string;
  description: string;
  reviews: ReviewDoc[];
  numberOfReviews: number;
  stock: number;
  productIsNew: boolean;
}

const reviewSchema = new mongoose.Schema<ReviewDoc>(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    title: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, require: true, ref: "User" },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema<ProductDoc>(
  {
    name: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    brand: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      require: true,
      default: 0,
    },
    numberOfReviews: {
      type: Number,
      require: true,
    },
    stock: {
      type: Number,
      require: true,
      default: 0,
    },
    productIsNew: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model<ProductDoc>("Product", productSchema);

export default Product;

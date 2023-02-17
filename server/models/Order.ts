import mongoose from "mongoose";

interface OrderItems {
  name: string;
  qty: number;
  image: string;
  price: number;
  product_id: {
    type: mongoose.Schema.Types.ObjectId;
    required: true;
    ref: "Product";
  };
}

export interface OrderDoc extends Document {
  user: mongoose.Schema.Types.ObjectId;
  username: string;
  email: string;
  orderItems: OrderItems[];
  shippingAddress: [
    {
      address: string;
      city: string;
      postalCode: string;
      country: string;
    }
  ];
  paymentMethod?: string;
  paymentDetails: [
    {
      orderId: string;
      payId: string;
    }
  ];
  shippingPrice: number;
  totalPrice: number;
  paidAt: Date;
  isDelivered: boolean;
  deliveredAt: Date;
}

const orderSchema = new mongoose.Schema<OrderDoc>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    username: {
      type: String,
      required: true,
      ref: "User",
    },
    email: {
      type: String,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        name: { type: String, require: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      default: false,
    },
    paymentDetails: {
      orderId: { type: String },
      payerId: { type: String },
    },
    shippingPrice: {
      type: Number,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      default: 0.0,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model<OrderDoc>("Order", orderSchema);
export default Order;

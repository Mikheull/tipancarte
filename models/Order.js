import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('1234567890abcdef', 8)

const orderSchema = new mongoose.Schema({
    nanoId: {
        type: String,
        default: () => nanoid(),
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [{ nanoId: {type: String}, name: { type: String, required: true }, image_preview: { type: String, required: true }, price: { type: Number, required: true } }],
    paymentMethod: { type: String, required: true },
    paymentResult: { id: String, status: String, email_address: String },

    shippingAddress: {
        fullName: { type: String, required: true },
        telephone: { type: String },
        address: { type: String, required: true },
        address2: { type: String },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
    },
    comment: { type: String },
    delivery_tracking: { type: String },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    isConfirmed: { type: Boolean, required: true, default: false },
    isPaid: { type: Boolean, required: true, default: false },
    isDelivered: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
},
    { timestamps: true }
)
const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;

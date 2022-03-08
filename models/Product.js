import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    /*  id: { type: String, required: false },  */
    name: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: false, default: "/images/shop/placeholder.jpg" },
    price: { type: Number, required: true },
    planks: [{
        position: {
            type: Number,
            default: 0
        },
        text: {
            type: String,
        },
        direction: {
          type: String,
          default: 'right'
        },
        bg_color: {
          type: String,
        },
        bg_color_ref: {
          type: String,
        },
        text_color: {
          type: String,
        },
        text_color_ref: {
          type: String,
        }
    }],
    description: { type: String, required: true, default: 0 },
},
    { timestamps: true }
)
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;

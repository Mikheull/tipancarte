import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('1234567890abcdef', 6)
var mongoose_delete = require('mongoose-delete');

const productSavedSchema = new mongoose.Schema({
    /*  id: { type: String, required: false },  */
    nanoId: {
      type: String,
      default: () => nanoid(),
    },
    name: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
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
    comment: { type: String, default: 'Aucun commentaire' },
},
    { timestamps: true }
)
productSavedSchema.plugin(mongoose_delete, { overrideMethods: 'all' });
const ProductSaved = mongoose.models.ProductSaved || mongoose.model("ProductSaved", productSavedSchema);
export default ProductSaved;

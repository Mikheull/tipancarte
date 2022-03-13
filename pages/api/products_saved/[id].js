import nc from 'next-connect'
import ProductSaved from '../../../models/ProductSaved'
import dbConnect from '../../../utils/database'
const handler = nc()

handler.get(async (req, res) => {
    await dbConnect()
    const product = await ProductSaved.findOne({nanoId: req.query.id});
    res.send(product)
})
export default handler;

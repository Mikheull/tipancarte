import nc from 'next-connect'
import ProductSaved from '../../../../models/ProductSaved'
import { isAuth } from '../../../../utils/auth'
import dbConnect from '../../../../utils/database'

const handler = nc()

// USE THIS MIDDLEWARE TO CHECK ACTIVE USER (BEFORE CONTINUE WITH REQUEST)
handler.use(isAuth)

handler.put(async (req, res) => {
    await dbConnect()
    const body = req.body;
    const bodyUpdate = {
        name: body.name,
        price: body.price,
        planks: body.planks,
        comment: body.comment
    }

    const product = await ProductSaved.findOneAndUpdate({nanoId: req.query.id}, bodyUpdate);

    product.save()

    res.send('Successfully updated!')
})
export default handler;
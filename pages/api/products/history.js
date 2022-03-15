import nc from 'next-connect'
import Product from '../../../models/Product'
import { isAuth } from '../../../utils/auth'
import dbConnect from '../../../utils/database'

const handler = nc()

// USE A MIDDLEWARE TO CHECK ACTIVE USER (BEFORE CONTINUE WITH REQUEST)
handler.use(isAuth)

handler.get(async (req, res) => {
    await dbConnect()
    // 'req.user' is available because in JWT middleware (isAuth()) set that property for req.
    const products = await Product.find({ user: req.user._id });
    res.send(products)
})
export default handler;
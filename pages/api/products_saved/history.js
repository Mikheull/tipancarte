import nc from 'next-connect'
import ProductSaved from '../../../models/ProductSaved'
import { isAuth } from '../../../utils/auth'
import dbConnect from '../../../utils/database'

const handler = nc()

// USE A MIDDLEWARE TO CHECK ACTIVE USER (BEFORE CONTINUE WITH REQUEST)
handler.use(isAuth)

handler.get(async (req, res) => {
    await dbConnect()
    // 'req.user' is available because in JWT middleware (isAuth()) set that property for req.
    const productsSaved = await ProductSaved.find({ user: req.user._id });
    res.send(productsSaved)
})
export default handler;
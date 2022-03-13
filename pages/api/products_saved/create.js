import nc from 'next-connect'
import { isAuth } from '../../../utils/auth'
import ProductSaved from '../../../models/ProductSaved';
import dbConnect from '../../../utils/database'
import { onError } from '../../../utils/error';
const handler = nc({ onError })

// USE A MIDDLEWARE TO CHECK ACTIVE USER (BEFORE CONTINUE WITH REQUEST)
handler.use(isAuth)
// CREATE AN PRODUCT IN BACKEND
handler.post(async (req, res) => {
    // console.log('Creating new product from: ', req.user)
    // console.log('New product body: ', req.body)
    const body = req.body
    
    await dbConnect()
    const newProduct = new ProductSaved(body);
    const product = await newProduct.save();
    // console.log(product)
    res.status(201).send(product)
})
export default handler;
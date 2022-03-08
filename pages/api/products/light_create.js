import nc from 'next-connect'
import Product from '../../../models/Product';
import dbConnect from '../../../utils/database'
import { onError } from '../../../utils/error';
const handler = nc({ onError })

// USE A MIDDLEWARE TO CHECK ACTIVE USER (BEFORE CONTINUE WITH REQUEST)
// CREATE AN PRODUCT IN BACKEND
handler.post(async (req, res) => {
    // console.log('Creating new product from: ', req.user)
    // console.log('New product body: ', req.body)
    const body = req.body
    
    await dbConnect()
    const newProduct = new Product(body);
    const product = await newProduct.save();
    // console.log(product)
    res.status(201).send(product)
})
export default handler;
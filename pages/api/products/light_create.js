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
    await dbConnect()
    const newProduct = new Product({
        ...req.body, rating: 0, image: 'https://tipancarte.fr/images/shop/placeholder.jpg'
    });
    const product = await newProduct.save();
    // console.log(product)
    res.status(201).send(product)
})
export default handler;
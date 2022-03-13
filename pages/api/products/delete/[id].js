import nc from 'next-connect'
import Product from '../../../../models/Product'
import { isAuth } from '../../../../utils/auth'
import dbConnect from '../../../../utils/database'

const handler = nc()

// USE THIS MIDDLEWARE TO CHECK ACTIVE USER (BEFORE CONTINUE WITH REQUEST)
handler.use(isAuth)

handler.delete(async (req, res) => {
    await dbConnect()
    await Product.deleteById(req.query.id);
    res.send('Supprimé avec succès !')
})
export default handler;
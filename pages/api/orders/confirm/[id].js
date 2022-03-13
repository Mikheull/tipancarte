import nc from 'next-connect'
import Order from '../../../../models/Order'
import { isAuth } from '../../../../utils/auth'
import dbConnect from '../../../../utils/database'

const handler = nc()

// USE THIS MIDDLEWARE TO CHECK ACTIVE USER (BEFORE CONTINUE WITH REQUEST)
handler.use(isAuth)

handler.put(async (req, res) => {
    await dbConnect()
    const order = await Order.findById(req.query.id);
    order.isConfirmed = true;
    order.confirmedAt = Date.now();
    order.save()
    res.send('Successfully confirmed!')
})
export default handler;
import nc from 'next-connect'
import Order from '../../../../models/Order'
import Product from '../../../../models/Product'
import User from '../../../../models/User'

import { isAuth } from '../../../../utils/auth'
import dbConnect from '../../../../utils/database'
import { onError } from '../../../../utils/error'

import { payOrder } from '../../../../templates/TiPancarte/payOrder.jsx'
import { payOrderAdmin } from '../../../../templates/TiPancarte/payOrderAdmin.jsx'
const handler = nc({ onError })

// USE THIS MIDDLEWARE TO CHECK ACTIVE USER (BEFORE CONTINUE WITH REQUEST)
handler.use(isAuth)

handler.put(async (req, res) => {
    await dbConnect()
    const order = await Order.findOne({nanoId: req.query.id}).populate({path: 'user', model: User, select: 'email'})
    // console.log('my order: ', order.orderItems)
    const orderItems = order.orderItems;

    const orderReducer = orderItems.reduce((acc, curr) => {
        return [...acc, { [curr.nanoId]: 0, id: curr.nanoId }]
    }, [])
    // console.log('ORDER REDUCER:', orderReducer)

    if (order) {
        order.isPaid = true,
            order.paidAt = Date.now(),
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                email_address: req.body.email_address
            }
        const paidOrder = await order.save()
        // DECREMENT STOCK QUANTITY FOR EACH PRODUCT SOLD (IN DB)
        orderReducer.forEach(async (item) => {
            // console.log('Iterations', item)
            const found = await Product.findOne({nanoId: item.id})
            // console.log('we found this: ', found, `${item.id}`)
            await found.save()
        })

         // Send email pay order
        await payOrder(
            `https://tipancarte.fr/profile/orders/${order.nanoId}`, 
            order.user.email
        )

        await payOrderAdmin(
            `https://tipancarte.fr/admin/orders/${order.nanoId}`
        )

        res.send({ message: 'La commande à été payée', order: paidOrder })
    } else {
        res.status(404).send({ message: 'Commande non trouvée' })
    }
})
export default handler;
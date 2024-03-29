import nc from 'next-connect'
import User from '../../../models/User'
import dbConnect from '../../../utils/database'
import bcrypt from 'bcrypt'
import { signToken } from '../../../utils/auth'
import { newCustomer } from '../../../templates/TiPancarte/newCustomer.jsx'
const handler = nc()

// Generating a new user (Register)
handler.post(async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password, 10)
    await dbConnect()
    const newUser = await new User({ name, email, password, createdByGoogle: false })
    const user = await newUser.save()
    const token = signToken(user) // Return the token
    // console.log('User created: ', user, token)

    // Send email Welcome
    if(user){
        await newCustomer(user.name, user.email)
    }

    res.send({
        token,
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdByGoogle: user.createdByGoogle
    })
})
export default handler;

import nc from 'next-connect'
import User from '../../../models/User'
import dbConnect from '../../../utils/database'
import bcrypt from 'bcrypt'
import { isAuth, signToken } from '../../../utils/auth'

const handler = nc()
// This endpoint needs authenticated users
handler.use(isAuth)
// Generating a new user (Register)
handler.put(async (req, res) => {
    await dbConnect()
    const isUser = await User.findById(req.user._id) // req.user is coming from isAuth middleware
    
    isUser.name = (req.body.name) ? req.body.name : isUser.name;

    if(req.body.password){
        isUser.password = req.body.password ? bcrypt.hashSync(req.body.password, 10) : isUser.password
    }

    await isUser.save()
    const token = signToken(isUser) // Return the token as well
    res.send({
        token,
        _id: isUser._id,
        name: isUser.name,
        email: isUser.email,
        role: isUser.role,
        createdByGoogle: isUser.createdByGoogle,
    })
})
export default handler;

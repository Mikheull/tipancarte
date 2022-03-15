import nc from 'next-connect'
import { onError } from '../../../utils/error';
import { contact } from '../../../templates/TiPancarte/contact.jsx'
const handler = nc({ onError })

handler.post(async (req, res) => {
    const email = await contact(req.body.fullname, req.body.email, req.body.subject, req.body.message)
    res.status(201)
})
export default handler;

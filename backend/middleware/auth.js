
import jwt from 'jsonwebtoken'

const auth = (req,res,next)=>{
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    if(token == null){
        return res.status(401).json({message: "Authentication token required"})
    }

    jwt.verify(token,"bookStore123",(error,user) =>{
        if(error){
            return res.status(403).json({message:"Token expired. Please login again"})
        }
        req.user = user
        next()
    })
}

export default auth
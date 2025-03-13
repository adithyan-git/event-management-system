
const jwt = require('jsonwebtoken');

exports.authentication = (req,res,next)=>{

    const {token} = req.cookies;

    if(!token){
        return res.status(401).json({
            success:false,
            message:'un authorized person please login'
        })
    }

    jwt.verify(token,process.env.SECURITY_KEY,(err,decode)=>{
        if(err){
            return res.status(404).json({
                success:false,
                message:err.message
            })
        }

        req.Id = decode.id
        req.role = decode.role
        next();
    })
}

exports.authorisation = (...roles)=>{


    return (req,res,next)=>{
        const role = req.role
        if(!roles.includes(role)){
            return res.status(403).json({
                success:false,
                message:'un authorised person'
            })
        }
        next()

    }
}
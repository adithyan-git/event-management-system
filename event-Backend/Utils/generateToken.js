const jwt = require('jsonwebtoken');


exports.generateToken = (req,res)=>{

    const option = {
        id:req.Person.id,
        role:req.Person.role
    }

    try {
        const token = jwt.sign(option,process.env.SECURITY_KEY,{expiresIn:'1h'});

    if(!token){
        return res.status(401).json({
            success:false,
            message:'loggedlin failed'
            
        });
    }

    const loggedInPerson = {
        id:req.Person.id,
        fullname:req.Person.fullname,
        email:req.Person.email,
        place:req.Person.place,
        profileimage:req.Person.profileimage,
        role:req.Person.role
    }

    res.status(201).cookie('token',token,{maxAge: 24 * 60 * 60 * 1000}).json({
        success:true,
        message:'logIn completed',
        loggedInPerson
    });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}


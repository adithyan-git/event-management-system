const bcrypt = require('bcrypt');
const registrationDetail = require('../Models/Registration');
const { generateToken } = require('../Utils/generateToken');
const fs = require('fs');
const eventDetails = require('../Models/Event');

exports.registration = async (req,res) =>{

    const {fullname,email,password,place} = req.body;
    
    if(!fullname || !email || !password || !place){
       return res.status(400).json({
            success:false,
            message:'please check all fields are filled'
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(password,10);

        if( !req.file){
           return res.status(400).json({
                success:false,
                message:'please upload an image'
            });
        }

        const filePath = req.file.path;

        const registration = await registrationDetail.create({
            fullname,
            email,
            password:hashedPassword,
            place,
            profileImage:filePath
        })

       return res.status(201).json({
            success:true,
            message:'registration completed'
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
} 
exports.personlogin = async (req,res,next) =>{

    const {email,password} = req.body;
    
    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:'please check all fields are filled'
        });
    }

    try {
        const findedUser = await registrationDetail.findOne({email})
        
    if(!findedUser){
        return res.status(404).json({
            success:false,
            message:'user not found , please check your email'
        });
    }

    const matchPassword = await bcrypt.compare(password,findedUser.password);

    if(!matchPassword){
        return res.status(400).json({
            success:false,
            message:'user not found , please check your password'
        });
    }

    const loggdinUser = {
        id:findedUser._id,
        fullname:findedUser.fullname,
        email:findedUser.email,
        place:findedUser.place,
        profileimage:findedUser.profileimage,
        role:findedUser.role
    }

    req.Person = loggdinUser
    generateToken(req,res)
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }

   



}
exports.viewProfile  = async (req,res,next) =>{

    const id = req.Id;
    
    if(!id){
       return res.status(401).json({
            success:false,
            message:'un authonticated Person'
        });
    }

    try {
        const findedUser = await registrationDetail.findById(id);

    if(!findedUser){
        return  res.status(404).json({
            success:false,
            message:'user not found'
        });
    }

    const profile = Array(findedUser)
    
     return res.status(200).json({
        success:true,
        findedUser
        });
    } catch (error) {
        return  res.status(500).json({
            success:false,
            message:error.message
        });
    }
}
exports.updateProfile = async (req,res,next) => {

    const id = req.Id;

    const {fullname,email,place} = req.body;

    if(!fullname || !email ||!place){
       return res.status(400).json({
            success:false,
            message:'please check all fields are filled'
        })
    }

    try {
        const findedPerson = await registrationDetail.findById(id);

    if(!findedPerson){
        return res.status(404).json({
            success:false,
            message:'user not founnd'
        })
    }

    findedPerson.fullname = fullname
    findedPerson.email = email
    findedPerson.place = place

    findedPerson.save()

    return res.status(200).json({
        success:true,
        message:'updation completed'
    })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        }) 
    }

}
exports.updateProfileImage = async (req,res,next) => {

    const id = req.Id;

    try {
        const findedPerson = await registrationDetail.findById(id);

    if(!findedPerson){
        return res.status(404).json({
            success:false,
            message:'user not founnd'
        })
    }
    console.log('req.file=',req.file);
    
    if(!req.file){
        return res.status(400).json({
            success:false,
            message:'please upload an image'
        })
    }

    const oldPath = findedPerson.profileImage

    if(fs.existsSync(oldPath)){
        fs.unlinkSync(oldPath)
    }

    findedPerson.profileImage = req.file.path
    findedPerson.save()

    return res.status(200).json({
        success:true,
        message:'updation completed',
        findedPerson
    })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        }) 
    }

}
exports.addEvent = async (req,res,next) =>{

    const {title,description,location,date,time} = req.body;
    const id = req.Id;

    
    if(!title || !description || !location || !date || !time){
        return res.status(400).json({
            success:false,
            message:'please check all fields are filled'
        })
    }   

   try {
        await eventDetails.create({
        userId:id,
        title,
        description,
        location,
        date,
        time
    });

    return res.status(201).json({
        success:true,
        message:'event added'
    })
   } catch (error) {
    return res.status(500).json({
        success:false,
        message:error.message
    })
   }

    

}
exports.ViewAllEvent = async (req,res,next) =>  {

    const id = req.Id;

    if(!id){
       return res.status(401).json({
            success:false,
            message:'un athenticated person'
        })
    }

    try {
        const allEvents = await eventDetails.find();

    const sameEvent = allEvents.filter((event)=>event.userId.toString() === id.toString());

    if(!sameEvent){
        return res.status(404).json({
            success:false,
            message:'events are not found'
        })
    }

    return res.status(200).json({
        success:true,
        sameEvent
    })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
exports.updateEvent = async (req,res,next) => {

    const eventId = req.params.id;
    console.log('id=',eventId);
    
    const {title,description,location,date,time} = req.body;

    if(!title || !description || !location || !date ||!time){
        return res.status(400).json({
            success:false,
            message:'please check all fields are filled'
        });
    }

    if(!eventId){
        return res.status(400).json({
            success:false,
            message:'no event id'
        });
    }

   try {
    
    const findEvent = await eventDetails.findById(eventId);
    
    if(!findEvent){
        return res.status(404).json({
            success:false,
            message:'event not found'
        });
    }

    findEvent.title = title;
    findEvent.description = description;
    findEvent.location = location;
    findEvent.date = date;
    findEvent.time = time;

    findEvent.save();

    return res.status(200).json({
        success:true,
        message:'updation completed'
    });
   } catch (error) {
    return res.status(500).json({
        success:false,
        message:error.message
    });
   }




}
exports.deleteEvent = async (req,res,next) => {

    const eventId = req.params.id;

    if(!eventId){
        if(!eventId){
            return res.status(400).json({
                success:false,
                message:'no event id'
            });
        }
    }

    const findEvent = await eventDetails.findByIdAndDelete(eventId);

    if(!findEvent){
        return res.status(404).json({
            success:false,
            message:'deletion faild'
        });
    }

    return res.status(200).json({
        success:true,
        message:'deletion completed'
    });

}
exports.logOut = async (req,res,next) => {

    const userId = req.Id;
    const token = req.cookies.token ;

    if(!token){
        return res.status(401).json({
            success:false,
            message:'un authenticated person,no token'
        })
    }

    if(!userId){
        return res.status(401).json({
            success:false,
            message:'un authenticated person'
        })
    }

    try {
        const findedUser = await registrationDetail.findById(userId);


    if(!findedUser){
        return res.status(404).json({
            success:false,
            message:'user not found'
        });
    }

    findedUser.status = 'not active'
    findedUser.save()
    return res.status(200).clearCookie('token',token).json({
        success:true,
        message:'logout completed'
    });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        }); 
    }

}
exports.getLoginDetails = async (req,res,next) =>{
    
    const personId = req.Id;

    const findPerson = await registrationDetail.findById(personId)

    if(!findPerson){
        return res.status(404).json({
            success:false,
            message:'user not found'
        });
    }

    return res.status(200).json({
        success:true,
        findPerson
    });


    
}
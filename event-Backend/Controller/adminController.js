const eventDetails = require("../Models/Event");
const registrationDetail = require("../Models/Registration")
const fs = require('fs');

exports.viewAllUser = async (req,res,next) => {

    const registerdPerson = await registrationDetail.find();

    if(!registerdPerson){
       return res.status(404).json({
        success:false,
        message:'no registerd person'
       })
    }

    const allusers = registerdPerson.filter((person)=>person.role === 'user');
    if(!allusers){
        return res.status(404).json({
         success:false,
         message:'no registerd users'
        })
     }

     return res.status(202).json({
        success:true,
        allusers
       })


}
exports.viewUsersAllEvents = async (req,res) => {

    try {
        const  allEvents = await eventDetails.find();

    if(!allEvents){
        return res.status(404).json({
            success:false,
            message:'no events found'
           })
    }

    return res.status(202).json({
        success:true,
        allEvents
       })

    } catch (error) {
        return res.status(500).json({
        success:false,
        message:error.message
       });
    }
}
exports.updateUserDetails = async (req,res,next) => {

    const userId = req.params.id;

    const {role,status} = req.body;

    if( !role || !status){
       return res.status(400).json({
            success:false,
            message:'please check all fields are filled'
        })
    }

    if(!userId){
        return res.status(400).json({
            success:false,
            message:'no user id'
           });
    }

    const findedUser = await registrationDetail.findById(userId);

    if(!findedUser){
        return res.status(404).json({
            success:false,
            message:'user not found'
           });
    }

   
    findedUser.role = role;
    findedUser.status = status;

    findedUser.save();

    return res.status(202).json({
        success:true,
        message:'updation completed'
       });

}
exports.updateUserProfileImage = async (req,res) =>{

    const userId = req.params.id;

    if(!userId){
        return res.status(400).json({
            success:false,
            message:'no user id'
        })
    }

     try {
            const findedPerson = await registrationDetail.findById(userId);
    
        if(!findedPerson){
            return res.status(404).json({
                success:false,
                message:'user not founnd'
            })
        }
        
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
            message:'updation completed'
        })
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:error.message
            }) 
        }

}
exports.deleteUser = async (req,res,next) =>{
   
    const userId = req.params.id;

    if(!userId){
        return res.status(400).json({
            success:false,
            message:'no user id'
        })
    }
    const checkRegisterdUser =  await registrationDetail.findById(userId);

    if(!checkRegisterdUser){
        return res.status(404).json({
            success:false,
            message:'user not found'
        }) ;
    }

    const imagePath = checkRegisterdUser.profileImage

    if(fs.existsSync(imagePath)){
        fs.unlinkSync(imagePath)
    }

    const findedUser = await registrationDetail.findByIdAndDelete(userId);

    if(!findedUser){
        return res.status(404).json({
            success:false,
            message:'user not found,deletion faild'
        }) ;
    }


    return res.status(200).json({
        success:true,
        message:'deletion completed'
    }) ;

}

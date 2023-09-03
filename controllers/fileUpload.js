const  File= require("../models/File");
const cloudinary =require("cloudinary");

exports.localFileUpload = async(req,res)=>{
    try{
     
        const file = req.files.file;
        console.log("file is-->",file);

        let path = __dirname + "/files/" + Date.now() +`.${file.name.split('.')[1]}`;
        console.log("PATH-->" ,path);

        file.mv(path , (err) =>{
            console.log(err);
        })

        res.json({
            success : true,
            message :"local file uploaded successfully",
        });

    }
    catch(error){
       console.log(error);
       res.json({
        success:false,
        message:"error occur"
       })
    }
}


function isFileTypeSupported(type , supportedTypes){
    return supportedTypes.includes(type);
}


async function uploadFileToCloudinary(file , folder){
    const options = {folder};
    return await cloudinary.uploader.upload(file.tempFilePath , options);
}

exports.imageUpload = async(req,res) =>{
    try{
         const {name , tags , email} =req.body;

         const file = req.files.imageFile;

         const supportedTypes = ["jpg","jpeg","png"];
         const fileType = file.name.split('.')[1].toLowerCase();

         if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'file format not supported',
            })
         }

         const response = await uploadFileToCloudinary(file,"daksh");
        
         const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
         });

         res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'image  uploaded successfully',
         })
    }
    catch(error){
            console.error(error);
            res.status(400).json({
                success:fasle,
                message:'something went wrong',
            })
    }
}
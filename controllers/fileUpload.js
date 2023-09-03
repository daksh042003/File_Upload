const  File= require("../models/File");
const cloudinary = require("cloudinary").v2;

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

async function uploadFileToCloudinary(file , folder, quality){
    const options = {folder};
    if(quality){
        options.quality=quality;
    }
    options.resource_type = "auto";
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
                success:false,
                message:'something went wrong',
            })
    }
}







exports.videoUpload = async(req,res) =>{
    try{
         const {name , tags , email} =req.body;

         const file = req.files.videoFile;

         const supportedTypes = ["mp4","mov"];
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
            message:'video uploaded successfully',
         })
    }

    catch(error){
            console.error(error);
            res.status(400).json({
                success:false,
                message:'something went wrong',
            })
    }
}







exports.imageSizeReducer = async(req,res) =>{
    try{
         const {name , tags , email} =req.body;

         const file = req.files.imagereducedFile;

         const supportedTypes = ["jpg","jpeg","png"];
         const fileType = file.name.split('.')[1].toLowerCase();

         if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'file format not supported',
            })
         }

         const response = await uploadFileToCloudinary(file,"daksh",90);
        
         const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
         });

         res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'image size reduced  successfully',
         })
    }

    catch(error){
            console.error(error);
            res.status(400).json({
                success:false,
                message:'something went wrong',
            })
    }
}

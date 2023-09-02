const File= require("../models/File");

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
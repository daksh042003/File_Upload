const mongoose =require("mongoose");
const nodemailer = require("nodemailer");
const {transporter} = require("../config/nodemailer");


const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
});


fileSchema.post("save",async function(doc){
    try{
       
         console.log("document -->",doc);

         

         let info =await transporter.sendMail({
            from:`daksh`,
            to:doc.email,
            subject:"new file uploaded on cloudinary",
            html:`<h2>hii </h2><p>file uploaded check :<a href = "${doc.imageUrl}">${doc.imageUrl}</a></p>`,
        })
  
         console.log("info-->",info);
    }
    catch(error){
        console.error(error);
    }
})


const File = mongoose.model("File",fileSchema);
module.exports = File;
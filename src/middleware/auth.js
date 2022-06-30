const jwt=require("jsonwebtoken");
const Hire=require("../model/hire");

const auth=async(req,res,next)=>{
    try{
        const token=req.cookies.jwt;
        const verifyuser=jwt.verify(token,"mynameisprajjwalchamariaandmysisternameispriyalchamaria")
        console.log(verifyuser);
        const user=await Hire.findOne({_id:verifyuser._id})
        console.log(user);
        next();
        
    }catch(error){
        res.status(401).send(error);
    }

}
module.exports=auth;
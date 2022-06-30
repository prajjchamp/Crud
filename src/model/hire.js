const mongoose= require("mongoose");
const validator=require("validator");
const jwt=require("jsonwebtoken");

const employeeSchema=new mongoose.Schema({ 
      name: {
            type:String,
            required: true,
            unique:true,
            minlength:3
        },
        email:{
            type:String,
            required:true,
            unique:[true, "Email id already present"],
            validator(value){
                if(!validator.isEmail(value)){
                    throw new error("Email not valid")
                }
            }
        },
        phone:{
            type:String,
            min:10,
            unique:true
        },
        physics: {
            type     : Number,
            required : true,
            unique   : true,
            max:100
          },
         maths:{
            type     : Number,
            required : true,
            unique   : true,
            max:100
          },
          chem:{
            type     : Number,
            required : true,
            unique   : true,
            max:100
          },
        password:{
                type:String,
                required:true
        },
        confirmpassword:{
            type:String,
            required: true
        },
        tokens:[{
            token:{
                type:String,
                required: true
            }
        }]
})

//Verifying Token details present in header
employeeSchema.methods.generateToken=async function(){
    try{
        // console.log("jgv")
        // console.log(this._id);
        const token= jwt.sign({_id:this._id.toString()},"mynameisprajjwalchamariaandmysisternameispriyalchamaria") ;
       this.tokens=this.tokens.concat({token:token});
       await this.save();
        // console.log("mhv")
    //    console.log(token);
       return token;
    }catch(error){
                res.send(error);
                console.log(error);
    }
}

const Hire=new mongoose.model("Hire",employeeSchema);
module.exports=Hire;
const mongoose= require("mongoose");
mongoose.connect("mongodb://localhost:27017/qwerrt",{ useNewUrlParser: true, useUnifiedTopology: true}).then(() =>{
        console.log("Connection Successful")
}).catch( (err) =>{
    console.log("No connection")
});

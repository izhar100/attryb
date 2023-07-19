const mongoose=require("mongoose")
const { oemSpecsModel } = require("./oemSpecs.model")
const { userModel } = require("./user.model")

const inventorySchema=mongoose.Schema({
   kms:{type:String,required:true},
   majorSchratches:{type:String,required:true},
   orginalPaint: {type: String,required:true },
   accidents: {type: Number,required:true },
   prevBuyers: {type: Number,required:true },
   registrationPlace: {type: String,required:true },
   oemId: { type: mongoose.Schema.Types.ObjectId, ref: oemSpecsModel },
   userId: { type: mongoose.Schema.Types.ObjectId, ref: userModel },
   img: { type: String, required: true },
   title: { type: String, required: true },
   des:{type:Array,required:true},
   price: { type: Number,required:true },
},{
    versionKey:false
})

const inventoryModel=mongoose.model("inventory",inventorySchema)

module.exports={
    inventoryModel
}
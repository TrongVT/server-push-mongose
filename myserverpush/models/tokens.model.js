var mongoose=require('mongoose');
var TokenSchema=mongoose.Schema({
    token:{type:String,unique:true},
    userid:String
},{
    timestamps: true
});
module.exports=mongoose.model('tokens_table',TokenSchema);
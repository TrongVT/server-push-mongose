var Token=require('../models/tokens.model.js');

exports.create=function(req,res){
    if(!req.body.userid){
        res.status(500).send({message:"createFailed"})
    }
    Token.find({},function(err,tokens){
        var tokenregister;
        if(tokens.length==0){
            tokenregister=new Token({
                token:req.body.token,
                userid:req.body.userid
            });
            tokenregister.save(function(err,data){
                console.log(data);
                if(err){
                    res.status(500).send({message:"saveFailed0"});return;
                }
                else{
                    res.send(data);
                    return;
                }
            });
        }
        else{
            var kt=0;
            var idToken=0;
        for(var i=0;i<tokens.length;i++){
            if(tokens[i].token==req.body.token){
                tokenregister=new Token({
                    token:req.body.token,
                    userid:req.body.userid
                });
                kt=kt+1;
                idToken=tokens[i]["_id"];
            }
        }
        if(kt>0){
                //update
                Token.findById(idToken, function(err, tokenR) {
                    if(err) {
                        console.log("error roi nha")
                    }
                    else{
                        Token.remove({_id: tokenR._id}, function(err, data,next) {
                            if(err){

                            }
                            else{
                                console.log("remove success");
                               //add create again
                                tokenregister.save(function(err, data){
                                    if(err) {
                                        res.status(500).send({message: "Could not update note with id "});
                                    } else {
                                        res.send(data);
                                    }
                                });
                            }
                        });
                    }
                });
        }
        else{
            tokenregister=new Token({
                token:req.body.token,
                userid:req.body.userid
            });
            tokenregister.save(function(err,data){
                console.log(data);
                if(err){
                    res.status(500).send({message:"saveFailed"});
                }
                else{
                    res.send(data);
                }
            });
        }            
        }
    });
}
exports.update=function(req,res){
    //chua can dung toi
}
exports.delete=function(req,res){
    Token.remove({token:req.params.tokenid,userid:req.params.userid},function(err,data){
        if(err){
            res.status(500).send("deleteFailed");
        }
        else{
            res.send("deleteSuccess");
        }
    })
}
exports.gettoken=function(req,res){
    Token.find(function(err,tokens){
        if(err){
            res.status(500).send({message:"getFailed"});
        }
        else{
            res.send(tokens);
        }
    })
}
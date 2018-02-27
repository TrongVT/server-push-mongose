module.exports=function(app){
    var token=require('../controllers/tokens.controller');
    //Create new token
    app.post('/tokens',token.create);
    //Update token
    app.put('/tokens/:userid',token.update);
    //Delete token
    app.delete('/tokens/:tokenid/:userid',token.delete);
    //Get all token
    app.get('/tokens',token.gettoken);
}
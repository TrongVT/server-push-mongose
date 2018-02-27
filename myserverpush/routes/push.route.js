module.exports=function(app){
    var push=require('../controllers/push.controller');
    //Push notification to sepecific user
    app.post('/senduser',push.sendtouser);
    //Push notification to all user
    app.post('/sendall',push.sendtoall);
}
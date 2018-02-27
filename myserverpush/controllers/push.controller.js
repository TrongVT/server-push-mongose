var Token=require('../models/tokens.model.js');
var Expo = require( 'expo-server-sdk');

exports.sendtouser=function(req,res){
    if(!req.body.content){
        res.status(500).send({message:"createFailed"})
    }
  // Create a new Expo SDK client
  let expo = new Expo();
  // Create the messages that you want to send to clents
  var title=req.body.title;
  var content=req.body.content;
  var usersend=req.body.id;
  console.log("id :"+usersend)
  let messages = [];
  Token.find({},function(err,tokens){
    for (var item of tokens) {
        if(item.userid==usersend){
          messages.push({
            to: item.token,
            sound: 'default',
            title:title,
            body: content,
            data: { withSome: content },
            ttl:3600
          })
        }
      }
        // Create the messages that you want to send to clents 
        let chunks = expo.chunkPushNotifications(messages);
        (async () => {
        for (let chunk of chunks) {
            try {
            let receipts = await expo.sendPushNotificationsAsync(chunk);
            } catch (error) {
            console.error(error);
            }
        }
        })();
  })
  res.end("send success");
}
exports.sendtoall=function(req,res){
    if(!req.body.content){
        res.status(500).send({message:"createFailed"})
    }
    let expo = new Expo();
    // Create the messages that you want to send to clents
    let messages = [];
    var title=req.body.title;
    var content=req.body.content;
    Token.find({},function(err,tokens){
        for (let item of tokens) {
            if (!Expo.isExpoPushToken(item.token)) {
            console.error(`Push token ${item.token} is not a valid Expo push token`);
            continue;
        }
        messages.push({
                to: item.token,
                sound: 'default',
                title:title,
                body: content,
                data: { withSome: content },
              })
        }
        let chunks = expo.chunkPushNotifications(messages);
        
          (async () => {
            for (let chunk of chunks) {
              try {
                let receipts = await expo.sendPushNotificationsAsync(chunk);
              } catch (error) {
                console.error(error);
              }
            }
          })();
      })
      res.end("send all success");
}
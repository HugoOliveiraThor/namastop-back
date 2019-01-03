const express = require('express')
require('dotenv').config()
const slackBot = require('slackbots')
const Slack = require('slack-devkit');
const db = require('./firebase/init')

const { server } = new Slack({
    scope: 'chat:write,bot,chat:write:bot',
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    signing_secret: process.env.SIGNING_SECRET
  });


server.post('/actions', (req, res) => {
    const bot = new slackBot({
        token:process.env.TOKEN,
        name:process.env.NAME
    })
    bot.on("start", async function() {
      const {members} = await bot.getUsers();
      const user = req.slack;
      const userWhoSendMessage = {id:user.user_id,text:user.text} 
      
      const data_users = members.map(d => {
        return {
          id:d.id,
          team_id: d.team_id, 
          real_name: d.real_name, 
          real_name_normalized: d.profile.real_name_normalized,
          photo:d.profile.image_512,
          date: new Date()
        }
      })
      
      // console.log('user', data)
      const getIdUserWhoWillReceiveTheMessage = await bot.getUserId(_extractValueFromArroba(userWhoSendMessage.text))
      console.log('DataUser',getIdUserWhoWillReceiveTheMessage)
      const nameOfTheUserWhoReceiveTheMessage = data_users.find(d => d.id === getIdUserWhoWillReceiveTheMessage)
      const extractValueText = _extractValueBeginArroba(userWhoSendMessage.text) ? _extractValueBeginArroba(userWhoSendMessage.text) : 'You dont send any message' 
      console.log(extractValueText)
      
      
      // bot.getUserId(_extractValueFromArroba(data.text)).then((result) => {
      //     const valor = data_users.find(d => d.id === data.id)
      //     valor.text = _extractValueBeginArroba(data.text) ? _extractValueBeginArroba(data.text) : 'You dont send any message'
      //     const newUser = data_users.find(d => d.id === result)
      //     valor.sendToWho = result ? result : null
      //     valor.idToWho = newUser.id;
      //     valor.realNameWhoReceive = newUser.real_name;
      //     valor.photoWhoReceive = newUser.photo;

      //     console.log('Valor', valor)
      //     if(user && user !== 'USLACKBOT') {
      //       addToCollection(valor)   
      //    }
      // })  
    });
    return res.json({})
});

const addToCollection = (user) => {
    db.collection('namastop').add(user)
      .then((result) => {
      }).catch(err => {
        console.log('Something get wrong', err)
    })
}

const _extractValueFromArroba = (str) => str.substring(str.indexOf('@')+1);

const _extractValueBeginArroba = (str) => str.substring(0, str.indexOf('@'));

server.start(3001,() => {
    console.log('Server started on port 3001')
})



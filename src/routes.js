const express = require('express')
const routes = express.Router()
// const bot = require('../config/development')
const slackBot = require('slackbots')
const channel = 'general'
const db = require('./firebase/init')
const Slack = require('slack-devkit')

const { router } = new Slack({
  scope: 'chat:write,bot',
  client_id: '263849777893.512447946002',
  client_secret: 'da4ebfb948762b93adaa256bb3872638',
  signing_secret: 'e497782e89a828e096be52f5141480d7'
});



const handleMessage = (message,data) => {
  console.log('MESSAGE', message)
        switch(message) {
            case "hi":
            case "muito obrigado por parear comigo":
                sendGreeting();
                break;
            default:
                return;
        }
}
const sendGreeting = () => {
  var greeting = getGreeting();
  bot.postMessageToChannel(channel, greeting);
}

  routes.post('/actions', router, (req, res) => {
    console.log('Entrou')
  // const user = req.slack.user_id;
  console.log(req.slack.user_id)
  const channel = 'general';
  const bot = new slackBot({
    token:"xoxp-263849777893-263849778053-512416299955-d8a3970598c054099b2023bd8191c2bf",
    name:"namastop"
  })
    bot.on("start", function() {
      const {_value:{members}} = bot.getUsers();
      const data_users = members.map(d => {
        return {
          id:d.id,
          team_id: d.team_id, 
          real_name: d.real_name, 
          email: d.profile.email,
          real_name_normalized: d.profile.real_name_normalized,
          presence:d.presence,
          photo:d.profile.image_512
        }
      })
      // console.log(data_users)
      const valor = data_users.filter(d => {
        return d.real_name === 'Hugo Oliveira'
      })
    //   request.post('https://slack.com/api/oauth.access', data, function (error, response, body) {
    // if (!error && response.statusCode == 200) {
    //   // You are done.
    //   // If you want to get team info, you need to get the token here
    //   let token = JSON.parse(body).access_token; // Auth token
    // }

      bot.on("message", function(data) {
        if (data.type !== "message") {
            return;
        }
        console.log('DATAAAAAAA', data)
        handleMessage({user:data.user,text:data.text, array_users:data_users});
    });
    
    function handleMessage({user,text,array_users}) {
      console.log('USER', user)
      console.log('TEXT', text)
      if(user && user !== 'USLACKBOT') {
        let userSelected = array_users.filter(d => d.id === user) 
        userSelected[0].text = text;   
        // addToCollection(userSelected[0])   
      }
    }
      return res.json({})
    });
});

routes.post('/send_message', async (req, res) => {

})

const addToCollection = (user) => {
  db.collection('namastop').add(user)
    .then((result) => {
      console.log('Result', result.data)
    }).catch(err => {
  })
}






module.exports = routes
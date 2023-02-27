const express = require('express')
const request = require('request')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('home')
})

router.get("/webhook", (req, res) => {

  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    // Check the mode and token sent is correct
    if (mode === "subscribe" && token === process.env.MY_VERIFY_TOKEN) {
      // Respond with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Respond with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});

router.get('/profile', async (req, res) => {
  const data = {
    "get_started": { "payload": "get_started" },

    "persistent_menu": [
      {
        "locale": "default",
        "composer_input_disabled": false,
        "call_to_actions": [
          {
            "type": "postback",
            "title": "Request Help",
            "payload": "CARE_HELP"
          },
          {
            "type": "postback",
            "title": "Mode of Payment",
            "payload": "MODE_PAYMENT"
          },
          {
            "type": "web_url",
            "title": "Visit Our Site",
            "url": "https://dramastore.net",
            "webview_height_ratio": "full"
          }
        ]
      }
    ],
    
    "whitelisted_domains": [
      "https://dramastore.net",
      "https://font5.net",
    ]

  }

  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v2.6/me/messenger_profile",
    "qs": { "access_token": process.env.NINA_PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": data
  }, (err, response, body) => {
    if (!err) {
      console.log('message sent!')
      res.send('Data set successfully')
    } else {
      console.log(err.message)
    }
  });
})


module.exports = router
const request = require('request')
const axios = require('axios').default
const apis = require('./apis')

// Handles messages events
async function handleMessage(sender_psid, received_message) {
  let response;

  // Check if the message contains text
  if (received_message.text) {

    //get user info
    let res = await axios.get(`https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${process.env.NINA_PAGE_ACCESS_TOKEN}`).catch(e => console.log(e.message))
    let user = res.data
    console.log(user)

    // Create the payload for a basic text message
    response = {
      "text": `Hello ${user.first_name}.\nYou sent the message: "${received_message.text}". Now send me an image!`
    }
  } else if (received_message.attachments) {

    // Gets the URL of the message attachment
    let attachment_url = received_message.attachments[0].payload.url;
    let subtitle = `Bonyeza "Ndiyo" kukubali au "Hapana" kuukataa mchongo wangu.`

    response = {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [{
            "title": "Kabla ya yote. Je! uko tayari kupokea mchongo wangu wa leo.",
            "subtitle": subtitle,
            "image_url": attachment_url,
            "buttons": [
              {
                "type": "postback",
                "title": "Ndiyo",
                "payload": "yes",
              },
              {
                "type": "postback",
                "title": "Hapana",
                "payload": "no",
              }
            ],
          }]
        }
      }
    }
  }

  // Sends the response message
  await apis.callSendAPI(sender_psid, response);
  console.log('message sent')
  setTimeout(() => {
    apis.callSendAPI(sender_psid, { "text": 'Nimeupata ujumbe wako' })
      .then(() => console.log('second msg sent'))
      .catch(() => console.log(err.message))
  }, 3000)
}


// Handles messaging_postbacks events
async function handlePostback(sender_psid, received_postback) {
  let response;

  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  switch (payload) {
    case 'yes':
      response = { "text": "Thanks!" }
      break;

    case 'no':
      response = { "text": "Oops, try sending another image." }
      break;

    case 'get_started':
      //get user info
      let res = await axios.get(`https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${process.env.NINA_PAGE_ACCESS_TOKEN}`).catch(e => console.log(e.message))
      let user = res.data
      console.log(user)
      response = { "text": `Welcome ${user.first_name}` }
      break;

    default:
      response = { "text": "Oops: Unknown postback" }
  }

  // Send the message to acknowledge the postback
  await apis.callSendAPI(sender_psid, response);
  console.log('generic sent')
}

module.exports = {
  handleMessage,
  handlePostback
}
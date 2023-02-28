const request = require('request')
const axios = require('axios').default
const apis = require('./apis')

//fun facts
const funs = [
  `Sunscreen is your best friend and this cannot be stressed enough.`,
  `Belladonna (which is poisonous) was used in the form of drops by Roman women to make their eyes (particularly their pupils) appear bigger as bigger pupils were considered prettier in the Roman beauty standards. This practice however did not last very long (for obvious reasons).`,
  `Get your eight hours of sleep. Yep, that is right.`,
  `Do not over-cleanse. Yes, keeping your skin clean is vital, but it is also essential that you do not cleanse it so much that you end up ripping it off its natural oils required to keep it healthy.`,
  `The Ancient Egyptian Queen Cleopatra who was famous for her beauty is said to have the sails of her ships soaked in her perfume when going on or returning from voyages so that people could smell it and become aware of her arrival.`,
  `Shaved armpits were not a norm until 1915 when regular women started shaving their underarms after having seen them in a fashion advertisement.`,
  `The use of makeup has at different times in history been seen either as a status symbol, as something that can only be afforded by rich women, or as a characterization of loose morals.`
]

// Handles messages events
async function handleMessage(sender_psid, received_message) {
  let response;

  // Check if the message contains text
  if (received_message.text) {

    //get user info
    // let url = `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${process.env.NINA_PAGE_ACCESS_TOKEN}`
    // let res = await axios.get(url).catch(e => console.log(e.message))
    // let user = res.data

    // Create the payload for a basic text message

    let txt = received_message.text
    if (txt.toLowerCase().includes('hello')) {
      response = {
        "text": `Hello! How are you?\nThis is Regina Mchuchu, how may I help you?`
      }
    }
    else if (txt.toLowerCase().includes('help')) {
      response = {
        "text": `Do you need help on something? Write us your concerns and we will be happy to help.\n\nYou'll be helped here and also if matter you may reach us by other means:\nSkype: @regina.mchuchu255\nPhone/WhatsApp: +255 754-920-480\nEmail: regina.mchuchu@gmail.com\n\nAddress:\n145 MIGOMBANI STREET 116, \nDAR ES SALAAM, \nP.O.BOX 3354`
      }
    }

    else if (txt.toLowerCase() == 'hi' || txt.toLowerCase() == 'hi!') {
      response = {
        "text": `Hi there! What can I help you with?`
      }
    }

    else {
      response = {
        "text": `Thank you for reaching us. We got your message ("${received_message.text}"). We will get in contact with you soon!`
      }
    }

  } else if (received_message.attachments) {

    // Gets the URL of the message attachment
    let attachment_url = received_message.attachments[0].payload.url;
    let subtitle = `Is this right attachment`

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
  // setTimeout(() => {
  //   apis.callSendAPI(sender_psid, { "text": 'Nimeupata ujumbe wako' })
  //     .then(() => console.log('second msg sent'))
  //     .catch(() => console.log(err.message))
  // }, 3000)
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
      // let res = await axios.get(`https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${process.env.NINA_PAGE_ACCESS_TOKEN}`).catch(e => console.log(e.message))
      // let user = res.data
      response = { "text": `Hi there! Welcome to Regina Mchuchu page.\n\nHere we'are giving free tips about health and beauty tips.\n\nDid you know? Instead of smearing your face with a serum containing vitamin C, you can just eat an orange or other citrus fruit every day and probably not require any product. \n\nRegina Mchuchu is here to provide health tips about beauty. If you have a question or any concern this is a right place to clear it.` }
      break;

    case 'help':
      response = { "text": "Do you need help on something? Write us your concerns and we will be happy to help.\n\nAlso you can reach us with other means:\nSkype: @regina.mchuchu255\nPhone/WhatsApp: +255 754-920-480\nEmail: regina.mchuchu@gmail.com\n\nAddress:\n145 MIGOMBANI STREET 116, \nDAR ES SALAAM, \nP.O.BOX 3354" }
      break;

    case 'fun_fact':
      let rand = Math.floor(Math.random() * funs.length)
      response = { "text": funs[rand] }
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
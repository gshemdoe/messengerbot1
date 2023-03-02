const request = require('request')
const axios = require('axios').default
const fb_users_model = require('../models/fb-users')
const pm_mikeka = require('../models/pm-mikeka')
const apis = require('./apis')

//small delay
const delay = (ms) => new Promise(resolve=> setTimeout(resolve, ms))

// Handles messages events
async function handleMessage(sender_psid, received_message) {
  //let response;

  // Check if the message contains text
  if (received_message.text) {

    // Create the payload for a basic text message
    let txt = received_message.text

    if (txt.toLowerCase().includes('hello')) {
      let response = {
        "text": `Hello! How are you?\nThis is Regina Mchuchu, how may I help you?`
      }
      await apis.callSendAPI(sender_psid, response);
      console.log('message sent')
    }

    else if (txt.toLowerCase().includes('help')) {
      let response = {
        "text": `Do you need help on something? Write us your concerns and we will be happy to help.\n\nYou'll be helped here and also if matter you may reach us by other means:\nSkype: @regina.mchuchu255\nPhone/WhatsApp: +255 754-920-480\nEmail: regina.mchuchu@gmail.com\n\nAddress:\n145 MIGOMBANI STREET 116, \nDAR ES SALAAM, \nP.O.BOX 3354`
      }
      await apis.callSendAPI(sender_psid, response);
    }

    else if (txt.toLowerCase().includes('info')) {
      let response = {
        "text": `Information about us\n\n Our page (Regina Mchuchu) is a dedicated centre to provide health and beauty tips. Everyone knows that the only thing ever a human could wish is to have a good health and an outstanding beauty.\n\nWith us you gonna learn a lot of things so that we can keep you healthy and beautiful.`
      }
      await apis.callSendAPI(sender_psid, response);
    }

    else if (txt.toLowerCase() == 'hi' || txt.toLowerCase() == 'hi!') {
      let response = {
        "text": `Hi there! What can I help you with?`
      }

      // Sends the response message
      await apis.callSendAPI(sender_psid, response);
    }

    else {
      let txt = `Vipi! Unahitaji kujua mchongo wangu wa leo?`
      let btn_res = {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "button",
            "text": txt,
            "buttons": [
              {
                "type": "postback",
                "payload": "ndiyo",
                "title": "Ndiyo"
              },
              {
                "type": "postback",
                "payload": "hapana",
                "title": "Hapana"
              },
            ]
          }
        }
      }

      // Sends the response message
      await apis.callSendAPI(sender_psid, btn_res);
    }
  }

  else if (received_message.attachments) {
    // Gets the URL of the message attachment
    //upload this attachment url to the db
    let attachment_url = received_message.attachments[0].payload.url;
    let response = {
      "text": `Ujumbe wako umepokelewa\n\nImg URL: ${attachment_url}`
    }
    await apis.callSendAPI(sender_psid, response)
  }
}


// Handles messaging_postbacks events
async function handlePostback(sender_psid, received_postback) {
  let response;

  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  switch (payload) {
    case 'ndiyo':
      let td = new Date().toLocaleDateString('en-GB', { timeZone: 'Africa/Nairobi' })
      let mkeka = await pm_mikeka.findOne({ siku: td })
      if (mkeka) {
        let res1 = {
          "attachment": {
            "type": "image",
            "payload": {
              "url": mkeka.image,
              "is_reusable": true
            }
          }
        }
        let res2 = {
          "attachment": {
            "type": "template",
            "payload": {
              "template_type": "button",
              "text": mkeka.maelezo.replace(/\\\\r\\/g, ''),
              "buttons": [
                {
                  "type": "web_url",
                  "url": "https://mkekawaleo.com/pmatch/register",
                  "title": "JISAJILI SASA"
                },
              ]
            }
          }
        }

        //send mkeka
        await apis.callSendAPI(sender_psid, res1)
        await delay(500)
        await apis.callSendAPI(sender_psid, res2)
      } else {
        response = { "text": "Samahani! Kwasasa bado hatujaandaa mkeka wa leo, tafadhali rudi tena baada ya muda kidogo." }
        await apis.callSendAPI(sender_psid, response);
      }
      break;

    case 'hapana':
      response = { "text": "Okay! Ujumbe wako umepokelewa na utajibiwa ndani ya muda mfupi" }
      await apis.callSendAPI(sender_psid, response);
      break;

    case 'get_started':
      let txt = `Hello! Karibu,\nJe! Ungependa kujua mchongo wetu wa leo?`
      response = {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "button",
            "text": txt,
            "buttons": [
              {
                "type": "postback",
                "payload": "ndiyo",
                "title": "Ndiyo"
              },
              {
                "type": "postback",
                "payload": "hapana",
                "title": "Hapana"
              }
            ]
          }
        }
      }
      await apis.callSendAPI(sender_psid, response);
      break;

    case 'help':
      response = { "text": "Do you need help on something? Write us your concerns and we will be happy to help.\n\nAlso you can reach us with other means:\nSkype: @regina.mchuchu255\nPhone/WhatsApp: +255 754-920-480\nEmail: regina.mchuchu@gmail.com\n\nAddress:\n145 MIGOMBANI STREET 116, \nDAR ES SALAAM, \nP.O.BOX 3354" }
      await apis.callSendAPI(sender_psid, response);
      break;

    default:
      response = { "text": "Oops: Unknown postback" }
      await apis.callSendAPI(sender_psid, response);
  }
}

module.exports = {
  handleMessage,
  handlePostback
}
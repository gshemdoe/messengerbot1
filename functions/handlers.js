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

    else if (txt.toLowerCase().includes('mkeka')) {
      response = {
        "attachment": {
          "type": "image",
          "payload": {
            "url": "https://scontent.xx.fbcdn.net/v/t1.15752-9/332785860_110865141882030_178115573546292529_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=58c789&_nc_ohc=M6WlI4ooNP8AX9JvSLs&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdRU4qi3YI70Wprh7m77leaMEa3BtYzwohJ50CN4r-5c9A&oe=6426EE90",
            "is_reusable": true
          }
        }
      }
    }

    else if (txt.toLowerCase().includes('btn')) {
      let txt = `Baada ya kumtembezea Mhindi kisago jana, leo tena tuendeleze bakora mpaka aombe poo!\n\nTunaingia mjini kihivi:\n\n#1) Eintracht - SSC Napoli\n---> GG & U/O 2.5: "GG&O"\n• Both teams to score (timu zote zifungane) na mechi itoke over 2.5\n\n\n#2). Liverpool - Real Madrid \n---> First 10 minutes: Draw "X"\n• Draw dakika 10 za mwanzo.\n\n\n#3). Norwich City - Birmingham \n---> 1st Half: First team to score - "1"\n• Goli la kwanza kipindi cha kwanza litafungwa na Norwich City\n\n▬▬▬▬▬▬▬▬\n\nHizi options zinapatikana Gal Sport Betting, kama bado huna account.`
      response = {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "button",
            "text": txt,
            "buttons": [
              {
                "type": "web_url",
                "url": "https://mkekawaleo.com",
                "title": "BET SASA"
              },
            ]
          }
        }
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
    //upload this attachment url to the db
    let attachment_url = received_message.attachments[0].payload.url;
    console.log("att url is: " + attachment_url)
    let subtitle = `Leo tunatembea na option ya under 45.5 throwns. Hii inamaana mipira ya kurushwa isizidi 45 match nzima au kipindi cha kwanza. Bonyeza button hapo chini kujisajili`
    let tdate = new Date().toLocaleDateString('en-us')
    let title = `Mkeka wa Leo [${tdate}]`
    console.log(new Date().toLocaleTimeString())

    response = {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [{
            "title": title,
            "subtitle": subtitle,
            "image_url": `https://scontent.xx.fbcdn.net/v/t1.15752-9/332785860_110865141882030_178115573546292529_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=58c789&_nc_ohc=M6WlI4ooNP8AX9JvSLs&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdRU4qi3YI70Wprh7m77leaMEa3BtYzwohJ50CN4r-5c9A&oe=6426EE90`,
            "buttons": [
              // {
              //   "type": "postback",
              //   "title": "Ndiyo",
              //   "payload": "yes",
              // },
              {
                "type": "web_url",
                "title": "Jisajili Sasa",
                "url": "https://mkekawaleo.com/pmatch/register",
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
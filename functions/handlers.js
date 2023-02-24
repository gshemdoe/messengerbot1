const request = require('request')

// Handles messages events
function handleMessage(sender_psid, received_message) {
    let response;

    // Check if the message contains text
    if (received_message.text) {

        // Create the payload for a basic text message
        response = {
            "text": `You sent the message: "${received_message.text}". Now send me an image!`
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
    callSendAPI(sender_psid, response);
}





// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {

}




// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": process.env.NINA_PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!')
        } else {
            console.log(err.message)
        }
    });
}

module.exports = {
    handleMessage,
    handlePostback,
    callSendAPI
}
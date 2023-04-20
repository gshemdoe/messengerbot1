const axios = require('axios').default

// Sends response messages via the Send API
const callSendAPI = async (sender_psid, response) => {
    try {
        // Construct the message body
        let request_body = {
            "recipient": {
                "id": sender_psid
            },
            "message": response
        }

        await axios({
            method: 'POST',
            url: `https://graph.facebook.com/v16.0/me/messages/?access_token=${process.env.NINA_PAGE_ACCESS_TOKEN}`,
            data: request_body
        })
    } catch (err) {
        console.log(err.message)
        console.log(err)
    }
}

module.exports = {
    callSendAPI
}
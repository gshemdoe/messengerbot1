const { response } = require("express")

//get userdata
const get_user_data = async (id) => {
    try {
        // Send the HTTP request to the Messenger Platform
        await axios({
            method: "GET",
            url: `https://graph.facebook.com/${id}?fields=first_name,last_name,profile_pic&access_token=${process.env.NINA_PAGE_ACCESS_TOKEN}`
        })
    } catch (err) {
        console.log(err.message)
        console.log(err)
    }

}



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
            url: `https://graph.facebook.com/v2.6/me/messages/?access_token=${process.env.NINA_PAGE_ACCESS_TOKEN}`,
            data: request_body
        })
    } catch (err) {
        console.log(err.message)
        console.log(err)
    }
}

module.exports = {
    callSendAPI,
    get_user_data
}
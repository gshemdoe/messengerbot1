const express = require('express')
const handles = require('../functions/handlers')
const router = express.Router()
const request = require('request')

router.post('/webhook', async (req, res) => {

    // Parse the request body from the POST
    let body = req.body;

    // Check the webhook event is from a Page subscription
    if (body.object === 'page') {

        // Iterate over each entry - there may be multiple if batched
        for (let entry of body.entry) {
            // Get the webhook event. entry.messaging is an array, but 
            // will only ever contain one event, so we get index 0
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);

            // Get the sender PSID
            let sender_psid = webhook_event.sender.id;
            console.log('Sender PSID: ' + sender_psid);

            // Check if the event is a message or postback and
            // pass the event to the appropriate handler function
            //dont handle if msg is from my page
            if (webhook_event.message && sender_psid != process.env.PAGE_ID) {
                handles.handleMessage(sender_psid, webhook_event.message);
            } else if (webhook_event.postback && sender_psid != process.env.PAGE_ID) {
                handles.handlePostback(sender_psid, webhook_event.postback);
            }
        }

        // Return a '200 OK' response to all events
        res.status(200).send('EVENT_RECEIVED');

    } else {
        // Return a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }

});

module.exports = router
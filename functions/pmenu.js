let pmenu = {
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
    ]
}
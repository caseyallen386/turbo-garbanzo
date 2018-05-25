module.exports = {
    db: {
        "user": process.env.DB_USER,
        "pass": process.env.DB_PASS,
        "uri": process.env.DB_URI,
        "conn": "mongodb://%s:%s@%s"
    },
    GoogleOAuth: {
        "CientId": process.env.GOOGLE_OAUTH_CLIENT_ID,
        "ClientSecret": process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        "CallBackURL" : process.env.GOOGLE_OAUTH_CALLBACK_URI
    },
    cookie : {
        key : buffer.from(process.env.COOKIE_KEY).toString('SHA384')
    }
};
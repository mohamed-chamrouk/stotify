var express = require('express')
var router = express.Router()
var qs = require('qs')


var creds = {
    clientId: '0ee1b1beee59455681646cd0a8967a15',
    clientSecret: '4d897a1e59b9427b83e5a5c3293d136b',
    redirect_uri: 'http://127.0.0.1:5000/callback',
    scope: 'user-read-recently-played user-top-read'
}

/**
 * Initiates the connextion with the spotify API
 * @name get/setup
 * @function
 * @memberof module:routers/setupHandler
 */
router.get("/setup", (req, res) => {

    var state = req.query.state;
    
    res.redirect('https://accounts.spotify.com/authorize?' +
        qs.stringify({
            response_type: 'code',
            client_id: creds.clientId,
            scope: creds.scope,
            redirect_uri: creds.redirect_uri,
            state: state,
        }));
})


module.exports = router
module.exports.creds = creds;
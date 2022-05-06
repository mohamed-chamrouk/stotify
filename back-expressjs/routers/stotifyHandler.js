var SpotifyWebApi = require('spotify-web-api-node');

var express = require('express')
var router = express.Router()

var setupModule = require('./setupHandler.js')
var creds = setupModule.creds
var dbHandlerModule = require('./dbHandler.js');

var intervalAuthRunning = false;
var intervalAuthStopper = false;
var intervalFetchStatsRunning = false;
var intervalFetchStatsStopper = false;

var spotifyApi = new SpotifyWebApi({
    clientId: creds.clientId,
    clientSecret: creds.clientSecret,
    redirectUri: creds.redirect_uri
});

/**
 * Function that initiates an infinite loop to refresh the access token given by the Spotify Web API
 */
function intervalAuth() {
    spotifyApi.refreshAccessToken().then(
        function (data) {
            console.log(`[stotify] @ ${(new Date()).toLocaleString()} - Refreshing the access token`)
            spotifyApi.setAccessToken(data.body['access_token'])
        }, function (err) {
            console.error(`[stotify] @ ${(new Date()).toLocaleString()} - Refreshing the access token failed, terminating intervalAuth loop`)
            // TODO : Add another setTimeout that increases over time (think of Discord) until connection with the web api is up again
            interAuthStopper = true
        }
    )

    if (!intervalAuthStopper) {
        intervalAuthRunning = true
        setTimeout(intervalAuth, 3000000)
    } else {
        intervalAuthRunning = false
    }
}

/**
 * Function that initiates an infinite loop to fetch recent songs listened to by the user, process them and send them to be saved to the collection
 */
function intervalFetchStats() {
    let recentTracks = []

    spotifyApi.getMyRecentlyPlayedTracks({
        limit: 50
    }).then(function (data) {

        data.body.items.forEach((item) => {

            recentTracks.push(
                {
                    _id: item.played_at,
                    trackName: item.track.name,
                    trackUrl: item.track.external_urls.spotify,
                    trackImg: item.track.album.images[0].url,
                    trackPop: item.track.popularity,
                    trackDuration: item.track.duration_ms,
                    artistName: item.track.artists[0].name,
                    artistUrl: item.track.artists[0].external_urls.spotify,
                    artistId: item.track.artists[0].id,
                    featuredArtists: item.track.artists,
                    albumName: item.track.album.name,
                    albumUrl: item.track.album.external_urls.spotify,
                    albumImg: item.track.album.images[0].url,
                })
        })

        return recentTracks
    }, function (err) {
        console.error(`[stotify] @ ${(new Date()).toLocaleString()} - Somthing went wrong, redirecting to /setup...`)
        if (err.body.error.status === 401) {
            res.redirect('/setup')
        }
        intervalFetchStatsStopper = true;
        return 'error'
    }).then(function (data) {
        if (data === 'error') {
            return 'error'
        } else {
            dbHandlerModule.insertTracks(data)
            console.log(`[stotify] @ ${(new Date()).toLocaleString()} - Updated/Inserted ${data.length} tracks`)
        }
    });

    if (!intervalFetchStatsStopper) {
        intervalFetchStatsRunning = true
        setTimeout(intervalFetchStats, 4200000)
    } else {
        intervalFetchStatsRunning = false
    }
}

router.get("/stotify/terminate", (req, res) => {
    intervalAuthStopper = true
    intervalFetchStatsStopper = true
    res.redirect('/')
})

/**
 * Endpoint used by the Spotify Web API. Starts the infinite loops and gets the fetching going.
 * @name get/callback
 * @function
 * @memberof module:routers/stotifyHandler
 */
router.get("/callback", (req, res) => {
    var code = req.query.code || null;

    spotifyApi.authorizationCodeGrant(code).then(function (data) {
        spotifyApi.setAccessToken(data.body['access_token'])
        spotifyApi.setRefreshToken(data.body['refresh_token'])
        console.log(`[stotify] @ ${(new Date()).toLocaleString()} - Successfully retrieved the tokens`)
    }, function (err) {
        if (err.statusCode === 400) {
            console.error(`[stotify] @ ${(new Date()).toLocaleString()} - Authorization code expired, redirecting to the setup page`)
            res.redirect('/setup')
            return 'error'
        }
    }).then(function (txt) {
        if (txt === 'error') {
            return 'error'
        }
        !intervalAuthRunning && intervalAuth()
    }).then(function (txt) {
        if (txt === 'error') {
            return 'error'
        }
        !intervalFetchStatsRunning && intervalFetchStats()
    }).then(function (txt) {
        if (txt !== 'error') {
            res.cookie("logged_in", true)
            res.redirect('/')
        }
    })
})

/**
 * Fetching the user top artists through the Spotify API
 * @name get/spotify/getMyTopArtists
 * @function
 * @memberof module:routers/stotifyHandler
 * @param {string} term The time range for the analytic result
 * @param {number} limit The number of artists wanted
 */
router.get("/spotify/getMyTopArtists", (req, res) => {
    var term = ["short_term", "medium_term", "long_term"].includes(req.query.term) ? req.query.term : "medium_term"
    limit = Math.max(0, Math.min(parseInt(req.query.limit ? req.query.limit : 50), 50))
    spotifyApi.getMyTopArtists({ time_range: term, limit: limit })
        .then(function (data) {
            let topArtists = data.body;
            res.send(topArtists)
        }, function (err) {
            console.error(`[stotify] @ ${(new Date()).toLocaleString()} - Something went wrong`, err)
        });
})

/**
 * Gets the {limit} top artists for the term wanted
 * @param {string} term The time range for the analytic result
 * @param {number} limit The number of artists wanted
 * @returns A json object with the artists
 */
function getMyTopArtists(term = 'long_term', limit = 50) {
    spotifyApi.getMyTopArtists({ time_range: term, limit: limit })
        .then(function (data) {
            let topArtists = data.body;
            res.send(topArtists)
        }, function (err) {
            console.error(`[stotify] @ ${(new Date()).toLocaleString()} - Something went wrong`, err)
        });
}

/**
 * Fetching the user top tracks through the Spotify API
 * @name get/spotify/getMyTopArtists
 * @function
 * @memberof module:routers/stotifyHandler
 * @param {string} term The time range for the analytic result
 * @param {number} limit The number of tracks wanted
 */
router.get("/spotify/getMyTopTracks", (req, res) => {
    var term = ["short_term", "medium_term", "long_term"].includes(req.query.term) ? req.query.term : "medium_term"
    limit = Math.max(0, Math.min(parseInt(req.query.limit ? req.query.limit : 50), 50))
    spotifyApi.getMyTopTracks({ time_range: term, limit: limit })
        .then(function (data) {
            let topTracks = data.body;
            res.send(topTracks)
        }, function (err) {
            console.error(`[stotify] @ ${(new Date()).toLocaleString()} - Something went wrong`, err)
        });
})

/**
 * Gets the {limit} top tracks for the term wanted
 * @param {string} term The time range for the analytic result
 * @param {number} limit The number of artists wanted
 * @returns A json object with the tracks
 */
function getMyTopTracks(term = 'long_term', limit = 50) {
    spotifyApi.getMyTopTracks({ time_range: term, limit: limit })
        .then(function (data) {
            let topTracks = data.body;
            return topTracks
        }, function (err) {
            console.error(`[stotify] @ ${(new Date()).toLocaleString()} - Something went wrong`, err)
            return err
        });
}

/**
 * Gets the popularity index of a given user based on its most played tracks
 * @param {string} term The time range for the analytic result
 * @param {number} limit The number of artists wanted
 * @returns A json object with the popularity index and some playful commentary
 */
router.get('/getPopularityIndex', (req, res) => {
    var term = req.query.term in ['short_term', 'medium_term', 'long_term'] ? req.query.term : 'long_term'
    limit = Math.max(0, Math.min(parseInt(req.query.limit ? req.query.limit : 50), 50))
    spotifyApi.getMyTopTracks({ time_range: term, limit: limit })
        .then(function (data) {
            //console.log(data.body.items)
            const popularityIndex = data.body.items.map((item) => {
                return item.popularity}).reduce((prev, next) => prev + next, 0)/data.body.items.length

            

            switch (true) {
                case popularityIndex > 80:
                    res.json({ popInd: popularityIndex, status: 'Normand', desc: 'You follow the mass, try something else for a change' })
                    break;
                case popularityIndex < 60 && popularityIndex > 40:
                    res.json({ popInd: popularityIndex, status: 'Explorer', desc: 'You know a thing or two about underground art, don\'t brag about it' })
                    break;
                case popularityIndex < 40 && popularityIndex > 20:
                    res.json({ popInd: popularityIndex, status: 'Scientist', desc: 'You\'ve been where few have ever been, try listening to some Drake once in a while' })
                    break;
                case popularityIndex < 20:
                    res.json({ popInd: popularityIndex, status: 'Stalker', desc: 'Bro, you good?' })
                    break;
                default:
                    console.log(`[stotify] @ ${(new Date()).toLocaleString()} - Popularity Index didn't fit in any of the cases, value : ${popularityIndex}`)
                    res.json({bogus: 'boyy'})
                    break;
            }
        }, function (err) {
            console.error(`[stotify] @ ${(new Date()).toLocaleString()} - Something went wrong`, err)
            return err
        });
})

module.exports = router
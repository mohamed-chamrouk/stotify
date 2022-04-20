var express = require('express')
var qs = require('qs')
var dotenv = require('dotenv')
var SpotifyWebApi = require('spotify-web-api-node')
const MongoClient = require('mongodb').MongoClient

varx

var stotify;
const url = 'mongodb://127.0.0.1:27017'

MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, client) => {
    if (err) {
        return console.log(err);
    }

    // Specify database you want to access
    const db = client.db('stotifydb');
    stotify = db.collection('stotify');

    console.log(`MongoDB Connected: ${url}`);
});



var clientId = '0ee1b1beee59455681646cd0a8967a15',
    clientSecret = '4d897a1e59b9427b83e5a5c3293d136b',
    redirect_uri = 'http://127.0.0.1:5000/callback';

// Create the api object with the credentials
var spotifyApi = new SpotifyWebApi({
    clientId: clientId,
    clientSecret: clientSecret,
    redirectUri: redirect_uri
});

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get('/login', function (req, res) {

    var state = req.query.state;
    var scope = 'user-read-private user-read-email user-read-recently-played user-top-read user-read-playback-state';

    res.redirect('https://accounts.spotify.com/authorize?' +
        qs.stringify({
            response_type: 'code',
            client_id: clientId,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));


});

app.get('/', (req, res) => {

    if (!x) {
        var x = setInterval(() => console.log(3), 3000)
        console.log(x)
    }

    res.json({ bogus: 'boy' })
    console.log(req.cookies.accessToken)
});

app.get('/callback', (req, res) => {

    var code = req.query.code || null;

    spotifyApi.authorizationCodeGrant(code).then(function (data) {
        spotifyApi.setAccessToken(data.body['access_token'])
        spotifyApi.setRefreshToken(data.body['refresh_token'])
        console.log('passage auth')
        res.cookie('accessToken', data.body['access_token'])
        return res.redirect('/')
    })
})

app.get('/nowplaying', (req, res) => {

    if (req.cookies.accessToken) {
        spotifyApi.setAccessToken(req.cookies.accessToken)
    } else (
        res.redirect('/login')
    )

    let recentTracks = []

    spotifyApi.getMyRecentlyPlayedTracks({
        limit: 20
    }).then(function (data) {

        data.body.items.forEach((item) => {

            recentTracks.push(
                {
                    _id: item.played_at,
                    trackName: item.track.name,
                    trackUrl: item.track.external_urls.spotify,
                    trackImg: item.track.album.images[0].url,
                    trackPop: item.track.popularity,
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
        console.log('Something went wrong!', err);
        if (err.body.error.status === 401) {
            res.redirect('/login')
        }
    }).then(function (data) {
        stotify.insertMany(data, (err, results) => {
            if (err) {
                console.log(err)
            }
        })

        res.send(data)
    });


})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
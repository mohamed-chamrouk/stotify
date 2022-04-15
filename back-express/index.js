var express = require('express')
var qs = require('qs')
var dotenv = require('dotenv')
var SpotifyWebApi = require('spotify-web-api-node');
const { get } = require('http');

var clientId = '0ee1b1beee59455681646cd0a8967a15',
    clientSecret = '4d897a1e59b9427b83e5a5c3293d136b',
    access_token = '',
    authorizationCode = '',
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
var curSong = ''

const setCurSong = (song) => {
    curSong = song;
}

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
    res.json({ bogus: 'boy' })
    for (const key in req.query) {
        console.log(key, req.query[key])
    }
});

app.get('/callback', (req, res) => {

    var code = req.query.code || null;

    spotifyApi.authorizationCodeGrant(code).then(function (data) {
        spotifyApi.setAccessToken(data.body['access_token'])
    })

    res.redirect('/')
})

app.get('/nowplaying', (req, res) => {

    spotifyApi.getMyCurrentPlayingTrack().then(function(data) {
        console.log('Now playing: ' + data.body.item.name);
        const cur_song = data.body.item.name;
        setCurSong(cur_song)
        console.log(curSong)
        res.send(`Now playing : ${curSong}`)
      }, function(err) {
        console.log('Something went wrong!', err);
      });

    console.log(`Now playing : ${curSong}`)

    
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);

});
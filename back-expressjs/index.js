var express = require('express')
var stotifyHandler = require('./routers/stotifyHandler')
var dbHandler = require('./routers/dbHandler.js')
var cors = require('cors')
var cookieParser = require('cookie-parser');



const app = express();

app.use(cors())
app.use('', stotifyHandler)
app.use('', dbHandler)


app.use(cookieParser());


/**
 * Where it all starts.
 * @function
 */
app.get('/', (req, res) => {
    res.redirect('http://localhost:3000/')
});

app.get('/debug', (req, res) => {
    res.cookie('logged_in', 'no')
    res.redirect('/')
})

app.listen(5000, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${5000}`);
});
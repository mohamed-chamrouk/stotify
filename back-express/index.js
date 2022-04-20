var express = require('express')
var setup = require('./routers/setupHandler')
var stotifyHandler = require('./routers/stotifyHandler')
var dbHandler = require('./routers/dbHandler.js')
var cookieParser = require('cookie-parser');



const app = express();

app.use('', setup)
app.use('', stotifyHandler)
app.use('', dbHandler)

app.use(cookieParser());


/**
 * Where it all starts.
 * @function
 */
app.get('/', (req, res) => {
    res.json({ bogus: 'boy' })
});

app.get('/debug', (req, res) => {
    res.cookie('logged_in', 'no')
    res.redirect('/')
})

app.listen(5000, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${5000}`);
});
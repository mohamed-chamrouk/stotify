const express = require('express')
var router = express.Router()

const MongoClient = require('mongodb').MongoClient
var stotifyCollection;
var db;
const url = 'mongodb://localhost:27017'

MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, client) => {
    if (err) {
        return console.log(err);
    }
    db = client.db('stotifydb');
    stotifyCollection = db.collection('stotify');
    console.log(`[stotify] @ ${(new Date()).toLocaleString()} - MongoDB : Succesfully connected to ${url}`);
});


var router = express.Router()

/**
 * Function to insert data into MongoDB collection
 * @param {json} data The data to be inserted 
 */
function insertTracks(data) {
    stotifyCollection.insertMany(data, (err, results) => {
        if (err?.code && err?.code === 11000) {
            console.log(`[stotify] @ ${(new Date()).toLocaleString()} - MongoDB : Some insert clashed with existing entries.`)
        }
    })
}

/**
 * Calculates the date to be the current date minus the days passed in the request query
 * @param {json} req HTTP Request
 * @returns {Date} The calculated date
 */
function getDelay(req) {
    const curDate = new Date()
    let difference = new Date().getTime() - new Date('2022-04-22').getTime()
    const maxDelay = Math.ceil(difference / (1000*3600*24))
    const delay = (parseInt(req.query.days) ? req.query.days : maxDelay)
    const resultDate = curDate.setDate(curDate.getDate() - delay)
    return resultDate
}

/**
 * Checks for conformity of given a date (string) and returns the corresponding correct Date object
 * @param {string} date The string date
 * @param {string} cursor Whether the date represents the start or end of the time range wanted
 * @returns A usable Date object 
 */
function dateChecker(date, cursor) {
    if (Date.parse(date).toString() !== "NaN") {
        return new Date(date)
    } else {
        if (cursor === 'start') {
            return new Date('1990-04-20T15:41:07.891Z')
        } else {
            return new Date()
        }
    }
}

/**
 * Getting the number of unique (or not) songs listened to.
 * @name get/getNumberTracks
 * @function
 * @memberof module:routers/dbHandler
 * @param {string} days Number of days prior to today for the analytic result
 * @param {string} unique Whether or not the call should return unique listens
 * @returns {json} A json with the number of song listened to
 */
router.get('/getNumberTracks', (req, res) => {
    if (req.query.unique === 'yes') {
        stotifyCollection.distinct("trackName", { _id: { $gte: new Date(getDelay(req)).toISOString() } }).then(function (data) { res.json({ len: data.length }) })
    } else {
        stotifyCollection.countDocuments({ _id: { $gte: new Date(getDelay(req)).toISOString() } }).then(function (data) { res.json({ len: data }) })
    }
})

/**
 * Getting the number of unique artists listened to.
 * @name get/getNumberArtists
 * @function
 * @memberof module:routers/dbHandler
 * @param {string} days Number of days prior to today for the analytic result
 */
router.get('/getNumberArtists', (req, res) => {
    stotifyCollection.distinct("artistName", { _id: { $gte: new Date(getDelay(req)).toISOString() } }).then(function (data) { res.json({ len: data.length }) })
})

/**
* Getting the number of unique albums listened to.
* @name get/getNumberAlbums
* @function
* @memberof module:routers/dbHandler
* @param {string} days Number of days prior to today for the analytic result
*/
router.get('/getNumberAlbums', (req, res) => {
    stotifyCollection.distinct("albumName", { _id: { $gte: new Date(getDelay(req)).toISOString() } }).then(function (data) { res.json({ len: data.length }) })
})

/**
* Getting the number of minutes listened to
* @name get/getNumberMinutesPlayed
* @function
* @memberof module:routers/dbHandler
* @param {string} days Number of days prior to today for the analytic result
*/
router.get('/getNumberMinutesPlayed', (req, res) => {
    stotifyCollection.find({ _id: { $gte: new Date(getDelay(req)).toISOString() } }).toArray((err, data) => {
        res.json({ minutesPlayed: data.map((item) => typeof (item.trackDuration) === "number" ? item.trackDuration : 0).reduce((prev, next) => prev + next, 0) })
    })
})

/**
* Getting the date of the first recorded track
* @name get/getFirstTrackDate
* @function
* @memberof module:routers/dbHandler
*/
router.get('/getFirstTrackDate', (req, res) => {
    stotifyCollection.findOne().then(function (data) {
        res.json({ firstDate: data._id })
    })
})

/**
* Get how many/much of the metric you've listened to between the two dates given
* @name get/getMinutesListenedTo
* @function
* @memberof module:routers/dbHandler
* @param {string} metric The metric for the analytic result, either minutes or tracks (albums and artists)
* @param {string} date_start The beginning of the time range, defaults to the first Date
* @param {string} date_end The end of the time range, defaults to the request's date
* @returns {json} Json object with the date and the metric corresponding to it
*/
router.get('/getMetricListenedTo', (req, res) => {
    const metric = ['tracks', 'minutes'].includes(req.query.metric) ? req.query.metric : 'minutes'
    const date_start = dateChecker(req.query.date_start, 'start')
    const date_end = dateChecker(req.query.date_end, 'end')

    switch (metric) {
        case 'minutes':
            stotifyCollection.find({ _id: { $gte: date_start.toISOString(), $lte: date_end.toISOString() } }).toArray((err, data) => {
                res.json(data.map((item) => { return { date: item._id, trackDuration: item.trackDuration } }))
            })
            break;
        case 'tracks':
            stotifyCollection.find({}).toArray((err, data) => {
                res.json(data.map((item) => { return { date: item._id, track: item.trackName } }))
            })
            break;
        default:
            console.log(`[stotify] @ ${(new Date()).toLocaleString()} - No metric found`)
    }

})

const getDaysArray = function (start, end = new Date()) {
    for (var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
        arr.push(new Date(dt));
    }
    let jsonOutput = {}
    arr.forEach((v) => jsonOutput[v.toISOString().slice(0, 10)] = 0);
    return jsonOutput
};

/**
* Get how many tracks you've listened to in the past given days
* @name get/getPlayedTracksStats
* @function
* @memberof module:routers/dbHandler
* @param {string} days The number of days to which the api will go back to
* @returns {json} Json object with the date and the metric corresponding to it
*/
router.get('/stotify/getPlayedTracksStats', (req, res) => {
    stotifyCollection.find({}).toArray((err, data) => {
        let statOutput = getDaysArray(getDelay(req))
        data.forEach((item) => {
            index = item._id.slice(0, 10)
            typeof (statOutput[index]) === "number" ? statOutput[index] = statOutput[index] + 1 : statOutput[index] = 1
        })

        res.json(statOutput)
    })
})

/**
* Get how much minutes you've listened to in the past given days
* @name get/getPlayedMinutesStats
* @function
* @memberof module:routers/dbHandler
* @param {string} days The number of days to which the api will go back to
* @returns {json} Json object with the date and the metric corresponding to it
*/
router.get('/stotify/getPlayedMinutesStats', (req, res) => {
    stotifyCollection.find({}).toArray((err, data) => {
        let statOutput = getDaysArray(getDelay(req))
        data.forEach((item) => {
            index = item._id.slice(0, 10)
            typeof (statOutput[index]) === "number" ? statOutput[index] = statOutput[index] + item.trackDuration : statOutput[index] = item.trackDuration
        })

        res.json(statOutput)
    })
})

/**
* Get the top artists from the date of first launch
* @name get/stotify/getTopArtists
* @function
* @memberof module:routers/dbHandler
* @returns {Array} Array of objects with name of artist and number of times played
*/
router.get('/stotify/getTopArtists', (req, res) => {
    stotifyCollection.aggregate(
        [{
            $group: {
                _id: '$artistName',
                count: { $sum: 1 },
                img: {$last: "$albumImg"}
            }
        }]
    ).sort({count: -1}).toArray((err, data) => {
        res.send({value: data})
    })
})

/**
* Get the top trakcs from the date of first launch
* @name get/stotify/getTopTracks
* @function
* @memberof module:routers/dbHandler
* @returns {Array} Array of objects with name of track and number of times played
*/
router.get('/stotify/getTopTracks', (req, res) => {
    stotifyCollection.aggregate(
        [{
            $group: {
                _id: '$trackName',
                count: { $sum: 1 },
                img: {$last: "$albumImg"},
                artist: {$last: "$artistName"}
            }
        }]
    ).sort({count: -1}).toArray((err, data) => {
        res.send({value: data})
    })
})


module.exports = router
module.exports.insertTracks = insertTracks
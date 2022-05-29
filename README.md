# Stotify
<img src="https://github.com/mohamed-chamrouk/stotify/blob/main/stotify_logo.svg" height=120px></img>

Stotify is a small passion project made to track personal Spotify user statistics.
It does so by using [Spotify's Web API](https://developer.spotify.com/documentation/web-api/). By tracking every song listened to and using Spotify's provided top user statistics, we can have a pretty exhaustive view of the user's stats.

This app is nothing but a passion project.

## Deploying the app

## Usage

### Setup
On the first launch of the app you'll be met with the following page :

<img src="" height=200px></img>

This page gives you the status of the app (also available within the app) and a button to launch or enter the app.
For the first launch you'll be redirected to Spotify's login page to get the first access token with the required fields.

## Technical Overview

This project is a JavaScript fullstack web app developped using :
- **ReactJS** for the front-end
- **ExpressJS** for the back-end
- **MongoDB** for the database

### Librairies
This project relies heavily on the [Spotify Web API Node](https://github.com/thelinmichael/spotify-web-api-node) project. This librairy allows for easy configuration of the authorization flow and provides all the necessary methods for Spotify's API endpoints.

#### Front-End
The following librairies are used for the front-end app :
- ReactJS
- React-Redux
- React-Router
- ReCharts

#### Back-End
The following librairies are used for the back-end app :
- express
- mongodb
- cors
- cookie-parser

### Docker

## Pages
### Home Page
<img src="" height=200px></img>

In this page you will find a summary of all the available statistics.

Starting with some overview of the time spent listening to music in the past month and past year.
Following that a bar chart monitoring the time spent listening to music in the last 30 days.
Next up some stats about artists, albums and songs recorded in the database.
Then the top stats provided by Spotify's API.
Finally the Stotify's provided tops with a quick view of the number of listens for each entry.

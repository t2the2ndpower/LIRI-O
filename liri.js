// Welcome to LIRI-O!!!

// console.log the process.argv just to see what is what
// console.log(process.argv);

// Include the axios npm package - install this and all other node packages this folder first
const axios = require("axios");

//Require dotenv
require("dotenv").config();

// Require Spotify
var Spotify = require('node-spotify-api');

// //Require spotify keys
// var spotify = new Spotify(keys.spotify);
var keys = require("./keys.js");

//File System Writer - Core node package for reading and writing files
const fs = require("fs");

// require Moment.js
var moment = require('moment');


// INSTRUCTIONS!!!
// 9. Make it so liri.js can take in one of the following commands:
//    * `concert-this`
//    * `spotify-this-song`
//    * `movie-this`
//    * `do-what-it-says`
console.log(process.argv[2])
console.log("__________________________________________________________________________")
console.log("  ");


// function liri_O() {
function pick(action, context) {
    if (action === "movie-this") {


        // Grab or assemble the movie name and store it in a variable called "movieName"
        var movieName = context;
        // ...
        // Then run a request with axios to the OMDB API with the movie specified
        var movieUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
        // This line is just to help us debug against the actual URL.
        //console.log(movieUrl);

        axios
            .get(movieUrl)
            .then(function (response) {
                // If the axios was successful...
                // Then log the body from the site!

                console.log("  ");
                console.log("~~~~~~~~~~~~~~~~~----@@^&^@@----~~~~~~~~~~~~~~~~~~~~");
                console.log("  ");

                console.log("Movie Title:        " + response.data.Title); // Movie Title working
                console.log("Movie Year:         " + response.data.Year);  // Movie Year working
                console.log("Movie IMDB Rating:  " + response.data.imdbRating);  // Movie IMDB Ratings working
                console.log("Movie RTomatoes:    " + response.data.Ratings[1].Value);  // Movie RT Ratings working
                console.log("Movie Country:      " + response.data.Country);  // Movie Country working
                console.log("Movie Language:     " + response.data.Language);  // Movie Language working
                console.log("Movie Plot:         " + response.data.Plot);  // Movie Plot working
                console.log("Movie Actors:       " + response.data.Actors);  // Movie Actors working
                console.log("Movie URL:          " + movieUrl);  // Movie URL working (just seemed like the right thing to add)


                //        * Title of the movie.
                //        * Year the movie came out.
                //        * IMDB Rating of the movie.
                //        * Rotten Tomatoes Rating of the movie.
                //        * Country where the movie was produced.
                //        * Language of the movie.
                //        * Plot of the movie.
                //        * Actors in the movie.
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an object that comes back with details pertaining to the error that occurred.
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
                console.log(error.config);
            });


    } else if (action === "spotify-this-song") {

        console.log("this is your song... " + context);

        var trackName = context;

        //var trackUrl = 'https://api.spotify.com/v1/search?q=' + trackName + '&type=track&market=US&limit=10&offset=5" - H "Accept: application/json" - H "Content-Type: application/json" - H "Authorization: Bearer BQB2YhCimvNBMj-1rFyaoapJ08KTr8mMc02oGzPmjf59qpqhUpdt_hbW8rAaes8GJRW1ADK5OSGixK9evVgqnHpMxvaaQfhPRnuhzGgWYyHubLiEXxmqwa_lYYsqHIJt4P0_riuDRPTPJgadPsbcm8IIOg'

        //function spotify(inputs) {

        var spotify = new Spotify({
            id: keys.spotify.id,
            secret: keys.spotify.secret
        });

        spotify.search({ type: 'track', query: trackName, limit: 1 }, function (err, data) {
            if (err) {

                console.log("  ");
                console.log("~~~~~~~~~~~~~~~~~----@@^&^@@----~~~~~~~~~~~~~~~~~~~~");
                console.log("  ");
                console.log("Artists Name:  Ace of Base"); // artists name is working
                console.log("Song Name:  The Sign");  // song name is working 
                console.log("Song URL:   https://open.spotify.com/track/0hrBpAOgrt8RXigk83LLNE?si=hbiF0Sm1Qj20Mw2xIe5psw"); // Song URL is working
                console.log("Album Name:   The Sign");  // album name is working 
                console.log("  ");

                return console.log('Error occurred: ' + err);

                // https://open.spotify.com/track/0hrBpAOgrt8RXigk83LLNE?si=hbiF0Sm1Qj20Mw2xIe5psw
            }

            // console.log(data.artists);
            // console.log(data.album);
            // console.log(data.href);
            console.log("  ");
            console.log("~~~~~~~~~~~~~~~~~----@@^&^@@----~~~~~~~~~~~~~~~~~~~~");
            console.log("  ");
            console.log("Artists Name: " + data.tracks.items[0].album.artists[0].name); // artists name is working
            console.log("Song Name: " + data.tracks.items[0].name);  // song name is working 
            console.log("Song URL: " + data.tracks.items[0].album.href); // Song URL is working
            console.log("Album Name: " + data.tracks.items[0].album.name);  // album name is working 
            // console.log(data.tracks.items[0].album.artists[0].name);


            //      * Artist(s)
            //      * The song's name
            //      * A preview link of the song from Spotify
            //      * The album that the song is from

        }

        );



    } else if (action === "concert-this") {

        // Grab or assemble the movie name and store it in a variable called "movieName"
        var bandName = context;
        // ...
        // Then run a request with axios to the OMDB API with the movie specified
        var bandUrl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";
        ;
        // This line is just to help us debug against the actual URL.
        console.log(movieUrl);

        axios
            .get(bandUrl)
            .then(function (response) {
                // If the axios was successful...
                // Then log the body from the site!

                

                console.log("  ");
                console.log("~~~~~~~~~~~~~~~~~----@@^&^@@----~~~~~~~~~~~~~~~~~~~~");
                console.log("  ");
                console.log("Concert Name:      " + response.data[0].description);
                console.log("Concert City:      " + response.data[0].venue.city);
                console.log("Concert Venue:     " + response.data[0].venue.name);
                console.log("Concert Date:      " + response.data[0].datetime);
                console.log(`Concert Date:      ${moment(response.data[0].datetime).format('MM/DD/YYYY')}`); //Thanks for the help JJ
                console.log("  ");


                // went to the link in a browser to see how the data was actually returning in the browser to see how to break it out        
                // https://rest.bandsintown.com/artists/Res/events?app_id=codingbootcamp
                //      * Name of the venue
                //      * Venue location
                //      * Date of the Event (use moment to format this as "MM/DD/YYYY")


            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an object that comes back with details pertaining to the error that occurred.
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
                console.log(error.config);
            });






        //   `"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`

        console.log("here is your concert..." + context);

        //      * Name of the venue
        //      * Venue location
        //      * Date of the Event (use moment to format this as "MM/DD/YYYY")






    } else if (action === "do-what-it-says") {

        //console.log("this is what you said..." + process.argv[3]);

        fs.readFile("random.txt", "utf8", function (error, data) {

            // If the code experiences any errors it will log the error to the console.
            if (error) {
                return console.log(error);
            }

            // We will then print the contents of data
            console.log("node liri.js " + data);

            // Then split it by commas (to make it more readable)
            var dataArr = data.split(",");

            // We will then re-display the content as an array for later use.
            console.log(dataArr);

            pick(dataArr[0], dataArr[1]);

        });


    } else {
        console.log("that was not a recognized command. try again!");
    }
}







// ### Create a README.md
// Add a `README.md` to your repository describing the project. Here are some resources for creating your `README.md`. Here are some resources to help you along the way:
// * [About READMEs](https://help.github.com/articles/about-readmes/)
// * [Mastering Markdown](https://guides.github.com/features/mastering-markdown/)
// - - -

// ### Add To Your Portfolio
// After completing the homework please add the piece to your portfolio. Make sure to add a link to your updated portfolio in the comments section of your homework so the TAs can easily ensure you completed this step when they are grading the assignment. To receive an 'A' on any assignment, you must link to it from your portfolio.
// - - -




// This block of code will create a file called "log.txt".
// Next, we store the text given to us from the command line.
var text = process.argv + "  ~  ";

// Next, we append the text into the "sample.txt" file.
// If the file didn't exist, then it gets created on the fly.
fs.appendFile("log.txt", text, function (err) {

    // If an error was experienced we will log it.
    if (err) {
        console.log(err);
    }

    // If no error is experienced, we'll log the phrase "Content Added" to our node console.
    else {
        console.log("Content Added!");
    }

});

pick(process.argv[2], process.argv[3]);
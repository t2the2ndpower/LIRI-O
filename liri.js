// Welcome to LIRI-O!!!

// console.log the process.argv just to see what is what
// console.log(process.argv);


//WORKING - Require All The Things!!!

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

console.log(" you have selected to:  " + process.argv[2])
console.log("__________________________________________________________________________")
console.log("  ");


function pick(action, context) {

    //WORKING - I love IMDB's API it just makes sense!   

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

                // add to log.txt

                var log1 = " ";
                var log2 = "~~~~~~~~~~~~~~~~~----@@^&^@@----~~~~~~~~~~~~~~~~~~~~";
                var log3 = " ";
                var log4 = "Movie Title:        " + response.data.Title;
                var log5 = "Movie Year:         " + response.data.Year;
                var log6 = "Movie IMDB Rating:  " + response.data.imdbRating;
                var log7 = "Movie RTomatoes:    " + response.data.Ratings[1].Value;
                var log8 = "Movie Country:      " + response.data.Country;
                var log9 = "Movie Language:     " + response.data.Language;
                var log10 = "Movie Plot:         " + response.data.Plot;
                var log11 = "Movie Actors:       " + response.data.Actors;
                var log12 = "Movie URL:          " + movieUrl;

                fs.appendFile("log.txt",
                    `~~~~

                movie-this
                 ${log1}
                 ${log2}
                 ${log3}
                 ${log4}
                 ${log5}
                 ${log6}
                 ${log7}
                 ${log8}
                 ${log9}
                 ${log10}
                 ${log11}
                 ${log12}

                 ~~~~`,
                    function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("Content Added!");
                        }
                    })


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



        // WORKING - Spotify wasn't too bad AFTER I actually looked at the JSON in a browser window, their documentation is clear as mud            

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

            console.log("  ");
            console.log("~~~~~~~~~~~~~~~~~----@@^&^@@----~~~~~~~~~~~~~~~~~~~~");
            console.log("  ");
            console.log("Artists Name: " + data.tracks.items[0].album.artists[0].name); // artists name is working
            console.log("Song Name: " + data.tracks.items[0].name);  // song name is working 
            console.log("Song URL: " + data.tracks.items[0].album.href); // Song URL is working
            console.log("Album Name: " + data.tracks.items[0].album.name);  // album name is working 

            // add Spotify info to log.txt

            var log1 = " ";
            var log2 = "~~~~~~~~~~~~~~~~~----@@^&^@@----~~~~~~~~~~~~~~~~~~~~";
            var log3 = " ";
            var log4 = "Artists Name: " + data.tracks.items[0].album.artists[0].name;
            var log5 = "Song Name: " + data.tracks.items[0].name
            var log6 = "Song URL: " + data.tracks.items[0].album.href
            var log7 = "Album Name: " + data.tracks.items[0].album.name
            var log8 = "  "

            fs.appendFile("log.txt",
                `~~~~
                spotify-this-song

                 ${log1}
                 ${log2}
                 ${log3}
                 ${log4}
                 ${log5}
                 ${log6}
                 ${log7}
                 ${log8}

                 ~~~~`,
                function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Content Added!");
                    }
                })

        }

        );



        // WORKING - Axios and bands in town, not fun, not fun AT ALL       

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

                var log1 = " ";
                var log2 = "~~~~~~~~~~~~~~~~~----@@^&^@@----~~~~~~~~~~~~~~~~~~~~";
                var log3 = " ";
                var log4 = "Concert Name:      " + response.data[0].description;
                var log5 = "Concert City:      " + response.data[0].venue.city
                var log6 = "Concert Venue:     " + response.data[0].venue.name
                var log7 = "Concert Date:      " + response.data[0].datetime
                var log8 = "Concert Date:      " + response.data[0].datetime
                var log9 = "  "

                fs.appendFile("log.txt",
                    `~~~~
                concert-this
                 ${log1}
                 ${log2}
                 ${log3}
                 ${log4}
                 ${log5}
                 ${log6}
                 ${log7}
                 ${log8}
                 ${log9}

                 ~~~~`,
                    function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("Content Added!");
                        }
                    })

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

        console.log("here is your concert..." + context);



        // WORKING - Hanna helped me with this one,  ended up wrapping my big 'ole if statement in a function and calling it at the end

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



// WORKING! --- Grab the process.argv command and append it to the log.txt file
// update Stephan introduced me to the back tick which supports multi line text!!! BET.
// var a = 'hello world'
// var text = `I just wanted to say ${a}`;

// fs.appendFile("log.txt", text, function (err) {

//     if (err) {
//         console.log(err);
//     }

//     else {
//         console.log("Content Added!");
//     }

// });

// WORKING - ONE CALL TO RULE THEM ALL!!!! (thanks Hanna!)

pick(process.argv[2], process.argv[3]);
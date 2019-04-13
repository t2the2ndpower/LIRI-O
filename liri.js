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
if (process.argv[2] === "movie-this") {


    // Grab or assemble the movie name and store it in a variable called "movieName"
    var movieName = process.argv[3];
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


} else if (process.argv[2] === "spotify-this-song") {

    console.log("this is your song... " + process.argv[3]);

    var trackName = process.argv[3];

    //var trackUrl = 'https://api.spotify.com/v1/search?q=' + trackName + '&type=track&market=US&limit=10&offset=5" - H "Accept: application/json" - H "Content-Type: application/json" - H "Authorization: Bearer BQB2YhCimvNBMj-1rFyaoapJ08KTr8mMc02oGzPmjf59qpqhUpdt_hbW8rAaes8GJRW1ADK5OSGixK9evVgqnHpMxvaaQfhPRnuhzGgWYyHubLiEXxmqwa_lYYsqHIJt4P0_riuDRPTPJgadPsbcm8IIOg'

    //function spotify(inputs) {

    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });

    spotify.search({ type: 'track', query: trackName, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
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



} else if (process.argv[2] === "concert-this") {

    // Grab or assemble the movie name and store it in a variable called "movieName"
    var bandName = process.argv[3];
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

            console.log(response.data[0].description);
            console.log(response.data[0].venue.city);
            console.log(response.data[0].venue.name);
            console.log(response.data[0].datetime);

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

    console.log("here is your concert..." + process.argv[3]);

    //      * Name of the venue
    //      * Venue location
    //      * Date of the Event (use moment to format this as "MM/DD/YYYY")






} else if (process.argv[2] === "do-what-it-says") {

    console.log("this is what you said..." + process.argv[3]);

} else {
    console.log("that was not a recognized command. try again!");
};
// }

// ### What Each Command Should Do
// 1. `node liri.js concert-this <artist/band name here>`
//      * Date of the Event (use moment to format this as "MM/DD/YYYY")

// 2. `node liri.js spotify-this-song '<song name here>'`
//    * This will show the following information about the song in your terminal/bash window
//      * Artist(s)
//      * The song's name
//      * A preview link of the song from Spotify
//      * The album that the song is from
//    * If no song is provided then your program will default to "The Sign" by Ace of Base.
//    * You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.
//    * The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a **client id** and **client secret**:
//    * Step One: Visit <https://developer.spotify.com/my-applications/#!/>
//    * Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.
//    * Step Three: Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.
//    * Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the [node-spotify-api package](https://www.npmjs.com/package/node-spotify-api).

// 3. `node liri.js movie-this '<movie name here>'`
//   
//    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
//      * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>
//      * It's on Netflix!
//    * You'll use the `axios` package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.

// 4. `node liri.js do-what-it-says`
//    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
//      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
//      * Edit the text in random.txt to test out the feature for movie-this and concert-this.

// ### BONUS
// * In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.
// * Make sure you append each command you run to the `log.txt` file. 
// * Do not overwrite your file each time you run a command.

// ### Reminder: Submission on BCS
// * Please submit the link to the Github Repository!
// - - -

// ### Minimum Requirements
// Attempt to complete homework assignment as described in instructions. If unable to complete certain portions, please pseudocode these portions to describe what remains to be completed. Adding a README.md as well as adding this homework to your portfolio are required as well and more information can be found below.
// - - -

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
var text = process.argv;

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
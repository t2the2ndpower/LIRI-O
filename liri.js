// Welcome to LIRI-O!!!

// console.log the process.argv just to see what is what
// console.log(process.argv);

// Include the axios npm package - install this and all other node packages this folder first
const axios = require("axios");

//Require dotenv
require("dotenv").config();

// Require Spotify
require("node-spotify-api");

//Require spotify keys
var spotify = new Spotify(keys.spotify);
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

// function liri_O() {
if (process.argv[2] === "movie-this") {
    

    // Grab or assemble the movie name and store it in a variable called "movieName"
    var movieName = process.argv[3];
    // ...
    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    axios
        .get(queryUrl)
        .then(function (response) {
            // If the axios was successful...
            // Then log the body from the site!
            console.log(response.data);
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

} else if (process.argv[2] === "concert-this") {

    console.log("here is your concert..." + process.argv[3]);

} else if (process.argv[2] === "do-what-it-says") {

    console.log("this is what you said..." + process.argv[3]);

} else {
    console.log("that was not a recognized command. try again!");
};
// }

// ### What Each Command Should Do
// 1. `node liri.js concert-this <artist/band name here>`
//    * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:
//      * Name of the venue
//      * Venue location
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
//    * This will output the following information to your terminal/bash window:
//      ```
//        * Title of the movie.
//        * Year the movie came out.
//        * IMDB Rating of the movie.
//        * Rotten Tomatoes Rating of the movie.
//        * Country where the movie was produced.
//        * Language of the movie.
//        * Plot of the movie.
//        * Actors in the movie.
//      ```
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
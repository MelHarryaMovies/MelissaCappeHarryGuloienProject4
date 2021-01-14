
//create name space
const myApp = {};

//store api info and data to reuse 
myApp.apiKey = `262b2d458b0315ed4049499ffec1d210`;
myApp.url = `https://api.themoviedb.org/3/discover/movie`;
myApp.posterUrl = `https://image.tmdb.org/t/p/original`;

//store api's genre id codes for later use
myApp.romanceId = 10749;
myApp.actionId = 28;
myApp.horrorId = 27;
myApp.documentaryId = 99;


//randomizer function for selecting random movie from array
myApp.randomizer = (arr) => {
    //write math to give a random number within the length of the array 
    const randomIndex = Math.floor(Math.random() * arr.length);

    //pass that number into the index of the array
    return arr[randomIndex];
}

//scroll function to move to each section upon question answer
myApp.scrolly = (whereTo) => {
    $([document.documentElement, document.body]).animate({
        scrollTop: whereTo.offset().top
    }, 1000);
}


//button events - H1 and title fade and button appears 
myApp.buttonEvents = () => {
    // $('.enter').hide();
    // setTimeout(function () {
    //     $('.enter').fadeIn('slow');
    //     $('header p').fadeOut('slow');
    //     $('h1').fadeOut('slow');
    // }, 2000);

    //create event listeners to scroll page on question answer
    $('input[name=firstDate]').on('change', function () {
        myApp.scrolly($('#questionTwo'));

    });
    $('input[name=idealCar]').on('change', function () {
        myApp.scrolly($('#questionThree'));

    });
    $('input[name=vacation]').on('change', function () {
        myApp.scrolly($('#goButton'));
    });


}

//create function to select and display the chosen movie to the page (append)
myApp.displayMovie = (arr) => {

    const chosenFilm = myApp.randomizer(arr)
    const { title, poster_path, overview } = chosenFilm;

    const toAppend = `
        <div class="filmChoice wrapper">
                    <h2>And your movie is...</h2>
                    <div class="flexBox">
                        <div class="mediaColumn flexBox">
                            <div class="imageBox flexBox">
                            <img src="${myApp.posterUrl}${poster_path}" alt="${title} movie poster">
                            </div>
                            <div class="movieInfo flexColumn">
                                    <p class="title">${title}</p>
                                    <p class="overview">${overview}</p>
                                <a class="reload" href="#questionOne">Again?</a>
                            </div>
                        </div>
                    </div>
                </div>
        `;
    $('#results').empty();
    $('#results').append(toAppend);

    //event listener for reload button / reset form!
    $('.reload').on('click', function () {
        $('form').trigger('reset');
    })
}

//function to create array using movies of chosen genre based on question answers
myApp.createGenreArray = (selectedGenre) => {

    const genreArray = finalArray.filter((movie) => {
        if (movie.genre_ids.includes(selectedGenre)) {
            return movie;
        }
    })
    //pass in the genre array to be randomized and film selected/displayed
    myApp.displayMovie(genreArray);
}

//function to collect user input and translate to specific genre
myApp.genreFind = () => {

    $('form').on('submit', function (e) {
        e.preventDefault();

        //scroll to results on submit
        myApp.scrolly($('#results'));

        const romanceArray = [];
        const actionArray = [];
        const horrorArray = [];


        const questionOneChoice = $('input[name=firstDate]:checked').val();
        const questionTwoChoice = $('input[name=idealCar]:checked').val();
        const questionThreeChoice = $('input[name=vacation]:checked').val();

        //store user ansers in an array
        const userChoiceArray = [questionOneChoice, questionTwoChoice, questionThreeChoice];

        //loop through answer array and push answers into score array to keep track of how many of each genre(answer) they chose
        for (let i = 0; i < userChoiceArray.length; ++i) {

            if (userChoiceArray[i] === 'romance') {
                romanceArray.push(userChoiceArray[i])
            }
            else if (userChoiceArray[i] === 'action') {
                actionArray.push(userChoiceArray[i])
            }
            else if (userChoiceArray[i] === 'horror') {
                horrorArray.push(userChoiceArray[i])
            }


        }

        //take length of answer arrays and use length as score / store score
        const romanceScore = romanceArray.length;
        const actionScore = actionArray.length;
        const horrorScore = horrorArray.length;

        //find which score is highest and assign that genres ID (from api) into chosen genre
        //pass chosen genre into GenreArray function 
        if (romanceScore >= 2) {
            const chosenGenre = myApp.romanceId;

            myApp.createGenreArray(chosenGenre);

        }
        else if (actionScore >= 2) {
            const chosenGenre = myApp.actionId;

            myApp.createGenreArray(chosenGenre);
        }
        else if (horrorScore >= 2) {
            const chosenGenre = myApp.horrorId;

            myApp.createGenreArray(chosenGenre);
        }
        else {
            const chosenGenre = myApp.documentaryId

            myApp.createGenreArray(chosenGenre);

        }
    })
}


//call info from api 
//pass pages in as a parameter to select pages 480-500 (last 20 pages sorted by popularity - to get the "worst" movies - hahaha)
myApp.getInfo = function (pages) {
    return $.ajax({
        url: myApp.url,
        method: `GET`,
        datatype: `jsonp`,
        data: {
            api_key: myApp.apiKey,
            language: `en-US`,
            sort_by: `popularity.desc`,
            page: pages
        }
    })
}

const promiseArray = [];
const finalArray = [];

//loop through api calls passing in 1+ to the page parameter every time creating an array contaning 1 promise per each page called
for (let n = 480; n <= 500; n++) {
    promiseArray.push(myApp.getInfo(n));
}
//look at each promise/page and store as usable movieData
$.when(...promiseArray)
    .then(function (...moviePage) {

        //map through movieData to return usable info
        const movieData = moviePage.map(function (singlePage) {

            return singlePage[0].results;
        })

        //filter through usable movieData to consolodate all pages into one array
        movieData.forEach(function (arrayPage) {
            finalArray.push(...arrayPage);
        })

        //call genreFind to translate user input into a genre array
        myApp.genreFind();
    })
    //if API calls fail, tell the user about it!
    .fail(function (noMovie) {
        $('#results').append(`<h3>Sorry we are having technical difficulties!</h3>`)
    })



//initialize function
myApp.init = () => {
    myApp.buttonEvents();
}

//doc ready holding our init function
$(document).ready(function () {
    myApp.init();
});



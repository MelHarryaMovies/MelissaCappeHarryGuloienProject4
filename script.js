
//create name space
const myApp = {};

myApp.apiKey = `262b2d458b0315ed4049499ffec1d210`;
myApp.url = `https://api.themoviedb.org/3/discover/movie`;
myApp.posterUrl = `https://image.tmdb.org/t/p/original`;

myApp.romanceId = 10749;
myApp.actionId = 28;
myApp.horrorId = 27;

//genre - https://api.themoviedb.org/3/genre/movie/list


//create init function 
//timeout function on H1 or hover event listener that turns it into a button

//randomizer function for ego check station outputs
myApp.randomizer = (arr) => {
    //write math to give a random number within the length of the array 
    const randomIndex = Math.floor(Math.random() * arr.length);

    //pass that number into the index of the array
    return arr[randomIndex];
}

myApp.buttonEvent = () => {
    $('.enter').hide();
    setTimeout(function() {
        $('.enter').fadeIn('slow', function() {
           
        });
        $('h1').fadeOut('slow', function() {

        })
    }, 2000);


}

myApp.genreFind = (arr) => {

    $('form').on('submit', function (e) {
        e.preventDefault();

        const romanceArray = [];
        const actionArray = [];
        const horrorArray = [];


        const questionOneChoice = $('input[name=firstDate]:checked').val();
        const questionTwoChoice = $('input[name=idealCar]:checked').val();
        const questionThreeChoice = $('input[name=vacation]:checked').val();

        const userChoiceArray = [questionOneChoice,    questionTwoChoice, questionThreeChoice];
 
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

        const romanceScore = romanceArray.length;
        const actionScore = actionArray.length;
        const horrorScore = horrorArray.length;
        
        if (romanceScore >= 2) {
            const chosenGenre = myApp.romanceId;
        }
        else if (actionScore >=2) {
            const chosenGenre = myApp.actionId;
        }
        else if (horrorScore >=2) {
            const chosenGenre = myApp.horrorId;
        }
        else {
            console.log('fuck you');
            const chosenTitle = arr[16].title;
            const chosenOverview = arr[16].overview;
            const chosenPoster = arr[16].poster_path;

        }
        
            
        

    

        console.log(romanceArray, actionArray, horrorArray);


    })
 
}

//call info from api 

myApp.getInfo = function(pages) {
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
    // console.log(myApp.getInfo);
}

    const promiseArray = [];
    
    for (let n = 480; n <= 500; n++) {
        promiseArray.push(myApp.getInfo(n));
    }
    $.when(...promiseArray) 
    .then(function(...moviePage) {
        // console.log(moviePage);
        const movieData = moviePage.map(function(singlePage) {
            // console.log(singlePage[0].results[0].title)
            return singlePage[0].results[0];
        })
    })

    // myApp.getInfo.then(function (response) {
    //     const movieArray = response.results;
    //     console.log(movieArray);

    //     movieArray.forEach(function (movie) {
    //         const { genre_ids, title, poster_path, overview } = movie;
    //         // console.log(`${title} is about ${overview} and heres a picture ${myApp.posterUrl}${poster_path}`);
    //     })

    //     myApp.genreFind(movieArray);

    // })

    
//scroll function on h1 button that scrolls you down to q1

//create function to gather user input and store it in variables
//questions will evaluate based on a point system to decide genre 
//IF TIE - then present 4th question 

//function to call from the api and pass in user data variables as parameters
//grab movie poster, title, overview
myApp.init = () => {
    //hide button on load
    myApp.buttonEvent();
    

    


}






  $(document).ready(function() {
    myApp.init();
  });

//create display on page function 

//Reset button

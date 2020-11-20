
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

myApp.buttonEvent = () => {
    $('.enter').hide();
    setTimeout(function() {
        $('.enter').fadeIn('slow', function() {
           
        });
        $('h1').fadeOut('slow', function() {

        })
    }, 2000);


}

myApp.genreFind = () => {

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
        console.log(Math.max(romanceScore, actionScore, horrorScore));

            // if (questionOneChoice == 'romance') {
            //     romanceArray.push(questionOneChoice);
            // }
            // else if (questionOneChoice == 'action') {
            //     actionArray.push(questionOneChoice);
            // }
            // else if (questionOneChoice == 'horror') {
            //     horrorArray.push(questionOneChoice);
            // }
        

        

        console.log(romanceArray, actionArray, horrorArray);
    })
 
}
//scroll function on h1 button that scrolls you down to q1

//create function to gather user input and store it in variables
//questions will evaluate based on a point system to decide genre 
//IF TIE - then present 4th question 

//function to call from the api and pass in user data variables as parameters
//grab movie poster, title, overview
myApp.init = () => {
    //hide button on load
    myApp.buttonEvent();
    myApp.genreFind();

    //call info from api 
    myApp.getInfo = $.ajax({
        url: myApp.url,
        method: `GET`,
        datatype: `jsonp`,
        data: {
            api_key: myApp.apiKey,
            language: `en-US`,
            sort_by: `popularity.desc`,
            page: 499
        }
    })
    // console.log(myApp.getInfo);
    
    myApp.getInfo.then(function(response) {
        const movieArray = response.results;
        // console.log(movieArray);
    
        movieArray.forEach(function(movie) {
            const {genre_ids, title, poster_path, overview} = movie;
            // console.log(`${title} is about ${overview} and heres a picture ${myApp.posterUrl}${poster_path}`);
        })
        
    })


}






  $(document).ready(function() {
    myApp.init();
  });

//create display on page function 

//Reset button

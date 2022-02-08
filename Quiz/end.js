// Task - 1 > display highscore
const mostrecentscore = localStorage.getItem("mostrecentscore");// get recent score from local storage.
const finalscore = document.getElementById("finalscore");// get id where we have show final score.
finalscore.innerText = mostrecentscore;// Show final score on end page.

// Task - 2 > disabled till username input is empty.
const username = document.getElementById("username");
const savescorebutton = document.getElementById("savescorebutton");// to disable button
username.addEventListener("keyup", ()=>{
    savescorebutton.disabled = !username.value// if username not contain any value or empty (event listner value) then button should be disabled else enable automatically.
});

// Task - 3 > Store highscore in local storage.

//localStorage.setItem("highscore", JSON.stringify([]));// converts a JavaScript object or value to a JSON string
//console.log(JSON.parse(localStorage.getItem("highscore")));// convert a javascript string to an array object. or The JSON.parse() method parses a string and returns a JavaScript object(array). 
const highscore = JSON.parse(localStorage.getItem('highscore')) || [];// first time it initialize empty array.
console.log(highscore);


// saving Highscore by clicking on (save)button using onclick(event), with a function savehighscore.
savehighscore = event =>{
    console.log("button Clicked");
    event.preventDefault();

    const yourscore = {
        score: mostrecentscore,
        name: username.value
    };
    highscore.push(yourscore); 
    highscore.sort( (a,b)=> b.score - a.score)// if b score is highest than a score then put b before a.
    highscore.splice(5);// after index 5 we cut everything or we cannot save user after 5 user entered thier name
    localStorage.setItem("highscore", JSON.stringify(highscore));// updaate our local storage.
    // console.log(highscore);
    window.location.assign("/")
};


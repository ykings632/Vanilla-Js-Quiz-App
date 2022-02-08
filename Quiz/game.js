const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
// console.log(choices)
const questioncountertext = document.getElementById("questioncounter");
const scoretext = document.getElementById("score");
let currentquestion = {};
// let acceptinganswers = true;//after getting answer hold till next & accept answers.
let acceptinganswers = false;
let score = 0; // initially score is 0
let questioncounter = 0;// what question are u on.
let availablequestions = [];// copy of full question set, and it contain unique question & show/send unique questions from here to user.

let correctquestions = 0;// final display result
let wronganswers = 0;// wrong answers
let progressbarfull = document.getElementById("progressbarfull");

let questions = [];
// fetch questions from json file
fetch('questions.json').then(
    res =>{// we use return res.json to convert HttpResponse to json
        return res.json();
    }
).then(
    loadedquestions=>{
        console.log(loadedquestions);
        questions = loadedquestions;
        startgame();
    }
).catch(error=>{
    alert("Json Fetching Question Error", error);
});

// constants
const correct_bonus = 10;// each times if user guess correct.
const max_questions = 5; // no. of total questions that user have to answer.

startgame = () =>{
    questioncounter = 0;
    score = 0;
    availablequestions = [...questions];
    console.log(availablequestions)
    getnewquestion();
};


// working of this function is -  1. we get random question from question
//                                2. show choices of particular random question that is selected (refer to point 1).
//                                3. remove particular selected question from array after it displayed.
//
getnewquestion = () =>{

    if (availablequestions.length === 0 || questioncounter>=max_questions){
        localStorage.setItem("mostrecentscore", score);
        // goto end page
        return window.location.assign('/end.html');
    }
                                        
    questioncounter++;

    // questioncountertext.innerText = questioncounter + '/' + max_questions;
    // by using template literals(es6 feaures)
    questioncountertext.innerText = `${questioncounter}/${max_questions}`

    //update progressbar
    progressbarfull.style.width = `${(questioncounter/max_questions)*100}%`;

    
    const questionindex = Math.floor(Math.random()*availablequestions.length);// suppose we get number "2".
    currentquestion = availablequestions[questionindex];
    question.innerText = currentquestion.question;// jaha par id me question hai html page me waha par apna currentquestion show krne hai.     

    
    // Show Choices one by one of particuar Question.
    choices.forEach(choice =>{
        const number = choice.dataset['number'];// this shows ki us particular choice par kya number hai.
        choice.innerText = currentquestion['choice' + number];
    });

    // splice out current question and move forward to next one.
    availablequestions.splice(questionindex,1)

    // Allowing to Accepting answers(after loaded all questions), but we see initially its false
    acceptinganswers = true;
};

// to check which choice is clicked by using Event Listner
choices.forEach(choice=>{
    choice.addEventListener("click",event =>{
        // console.log(event.target);// question that i clicked/seleected
        
        // if we are not ready to give answer then then make accepting answer to false.
        if (!acceptinganswers) return;
        // else
        acceptinganswers = false;
        const selectedchoice = event.target;// my selected answer(paragraph or p tag or ot maybe a div in some other condition)
        const selectedanswer = selectedchoice.dataset['number'];

        const classtoapply = (selectedanswer == currentquestion.answer) ? "correct":"incorrect";// by turnery operator  
        // console.log(classtoapply)
        // if(classtoapply === 'correct'){
        //     score = score+1;
        //     scoretext.innerText = score;
        // };// to increment the score by 1 always if correct.

        // or another way to increment score is----

        if(classtoapply === 'correct'){
            incrementscore(correct_bonus);
            correctquestions+=1;// to be display in final page
        }
        else{
            wronganswers+=1;// to be display in final page
        }

        // now give class to the correct and incorrect selected answer or div to change the color.
        selectedchoice.parentElement.classList.add(classtoapply);
        setTimeout(() => {
        selectedchoice.parentElement.classList.remove(classtoapply);
        getnewquestion();            
        }, 1000);// class & color add krne ke baad delay lgaya hai 1 sec ka 
        


    })
});

incrementscore = num =>{
    score = score+num;
    scoretext.innerText = score;
};

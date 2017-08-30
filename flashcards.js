const inquirer = require("inquirer");
const fs = require("fs");

const questions = require("./Questions.json");
const BasicCard = require("./BasicCard")
const ClozeCard = require("./ClozeCard")


var chosenCard;
var playedCard;
var count = 0;
var answerRight = 0;
var answerWrong = 0;

//function to start game using inquirer to list choices/response
function startMenu() {
    answerRight = 0;
    answerWrong = 0;
    inquirer.prompt([
    {
        type: "list",
        message: "\nPlease choose from the options below.",
        choices: ["Play", "List", "Exit"],
        name: "startMenu"
    }
]).then(function(answer){
    var pauseBreak;

    switch (answer.startMenu) {
        case 'Play':
        console.log("Questions will start momentarily.");
        pauseBreak = setTimeout(askQuestions, 1000);
        break;

        case 'List':
        console.log("Here are all the questions & answers");
        pauseBreak = setTimeout(listQuestions, 1000);

        case 'Exit':
        console.log("Thank you for playing. Goodbye!\n");
        return;
        break;
    }
});
};
startMenu();

//function to import cards from .js's and return the front (or partial for cloze) of card
function cardQuestions(card) {
    if(card.type === "BasicCard"){
        chosenCard = new BasicCard(card.front, card.back);
        return chosenCard.front;
    } else if (card.type === "ClozeCard"){
        chosenCard = new ClozeCard(card.text, card.cloze);
        return chosenCard.partial;
    }
};

//function using inquirer for user to input answers to questions. Logs and tallys result of answers.
function askQuestions() {
    if (count < questions.length) {
        playedCard = cardQuestions(questions[count]);
        inquirer.prompt([
        {
            type: "input",
            message: playedCard,
            name: "question"
        }
        ]).then(function (answer) {
            if (answer.question === questions[count].back || answer.question === questions[count].cloze) {
                console.log("Correct!");
                console.log("-----------------------")
                answerRight++;
        } else  {
            if (chosenCard.front !== undefined) {
            console.log("That is incorrect. The correct answer is: " + questions[count].back + ".");
            console.log("-----------------------")
                answerWrong++;
        } else {
            console.log("That is incorrect. The correct answer is: " + questions[count].cloze + ".");
            console.log("-----------------------")
                answerWrong++;
        }
    }
    count++;
    askQuestions();
});
    } else {
        count=0;
        console.log("-----------------------");
        console.log("Game over!");
        console.log("Correct answers: " + answerRight);
        console.log("Incorrect answers: " + answerWrong);

        startMenu();
    }
};

//function to log list of questions if user chooses LIST from options in startmenu
function listQuestions() {
  var questions = require("./Questions.json");

  if (count < questions.length) {
    if (questions[count].front !== undefined) {
        console.log("Front: " + questions[count].front);
        console.log("Back: " + questions[count].back + ".");
        console.log("----------------------");
    } else {
        console.log("Text: " + questions[count].text);
        console.log("Cloze: " + questions[count].cloze + ".");
        console.log("----------------------");
    }
    count++;
    listQuestions();
  } else {
    count=0;
    startMenu();
  }
};


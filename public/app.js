var wheelLocation = document.getElementById('wheelLocation');
var phraseBoard = document.getElementById('phraseBoard');
var scoreBox = document.getElementById('scoreBox');
var letterInput = document.getElementById('letterInput');
var letterMessage = document.getElementById('letterMessage');
var selectLettersBox = document.getElementById('selectLettersBox');
var spinButton = document.getElementById('spinButton');
var solveInput = document.getElementById('solveInput');


var solveOrSpinOptions = document.getElementById('solveOrSpinOptions');
var solveOption = document.getElementById('solveOption');
var spinOption = document.getElementById('spinOption');
//var guessOrBuyOption = document.getElementById('guessOrBuyOption');

//using these to hold button value of true or false
//var chooseConstanantButton = document.getElementById('chooseConstanant');
//var buyVowelButton = document.getElementById('buyVowel');


//var spinButton = document.getElementById('spinButton');

var wheelOfFortune = {

    score: 0,
    location: 0,
    lettersUsed: ['a', 'b', 'd'],
    constSelected: '',
    vowelSelected: '',
    costOfVowel: 200,
    whichButtonIsSelected: '',
    amountPlayingFor: 0,
    //going to need to add a color option to each tile
    wheel: ['bankrupt', 2000, 1000, 800, 600, 400, 200, 100, 'bankrupt', 100, 200, 400, 600, 800, 1000, 2000],
    phraseOnBoard: {

        phrase: "This is quite the test",
        hint: "It's a test stupid",
        phraseAsArray: [],
        //[letter][show, hide, space]
        turnPhraseToArray: function(thePhrase){
            //wheelOfFortune.phraseOnBoard.phraseAsArray = thePhrase.split('');
            var splitArr = thePhrase.split('');

            console.log(splitArr);
            for(var i = 0; i < splitArr.length; i++){

                if(splitArr[i] === ' '){

                    wheelOfFortune.phraseOnBoard.phraseAsArray.push([splitArr[i], 'space']);

                }else {

                    wheelOfFortune.phraseOnBoard.phraseAsArray.push([splitArr[i], 'hide']);

                }

            }
            console.log(wheelOfFortune.phraseOnBoard.phraseAsArray);
            
            
        }


    }

}


function spinTheWheel(){

    console.log('spin the wheel is invoked');
    var count = 0; //would be a random number
    var spin = setInterval(function(){

        if(count === 20){

            clearInterval(spin);
            console.log('now it should check play or bankrupt')
            playOrBankrupt();
            //evalLocation()
        }else{

            count++;
            evalLocation();
            //wheelLocation.innerHTML = count;

        }

    }, 400)
    
}

function evalLocation(){

    console.log('evaluating the place');

    if(wheelOfFortune.location >= wheelOfFortune.wheel.length - 1){

        wheelOfFortune.location = 0;
        wheelLocation.innerHTML = wheelOfFortune.wheel[wheelOfFortune.location];

    }else{

        wheelOfFortune.location++;
        wheelLocation.innerHTML = wheelOfFortune.wheel[wheelOfFortune.location];
        
    }

}


function playOrBankrupt(){

    console.log('do we play or go bankrupt')

    if(wheelOfFortune.wheel[wheelOfFortune.location] === 'bankrupt'){

        wheelOfFortune.score = 0;
        scoreBox.innerHTML = 0;
        console.log('you lose, spin again');
        console.log('you score is ', wheelOfFortune.score);
        toggleSpinButtonOn();

    }else {

        wheelOfFortune.amountPlayingFor = wheelOfFortune.wheel[wheelOfFortune.location];
        console.log('playing for ', wheelOfFortune.wheel[wheelOfFortune.location]);
        toggleSelectLettersBoxOn();
    }

}

$('#spinButton').on('click', function(){


    console.log('spin button click');
    spinTheWheel();
    toggleSpinButtonOff();
    //playOrBankrupt();

})

$('#chooseConstanant').on('click', function(){

    toggleLetterInputOn();
    wheelOfFortune.whichButtonIsSelected = 'constanant';
    letterMessage.innerHTML = 'Choose a constanant';
    

});

$('#buyVowel').on('click', function(){

    toggleLetterInputOn();
    if(wheelOfFortune.score > wheelOfFortune.costOfVowel){

        wheelOfFortune.whichButtonIsSelected = 'vowel';
        letterMessage.innerHTML = "Select a vowel for " + "$" + wheelOfFortune.costOfVowel;

    }else {

        letterMessage.innerHTML = "Sorry you don't have enough to buy a vowel";

    }

});


$('#letterInput').keypress(function(event){
    if(event.which == 13 || event.which == 'Enter'){

        //check to see if your doing const or vowel
        if(wheelOfFortune.whichButtonIsSelected === 'constanant'){

            //is the input one character
            if(letterInput.value.length === 1){

                //set character up for evaluation
                wheelOfFortune.constSelected = letterInput.value.toLowerCase();

                console.log(wheelOfFortune.constSelected);

                //is it a constanant?
                if(wheelOfFortune.constSelected.match(/[b-d,f-h,j-n,p-t,w-z]/)){

                    toggleSelectLettersBoxOff();

                    console.log('true logic check if it is in used list');
                    if(wheelOfFortune.lettersUsed.includes(wheelOfFortune.constSelected)){

                        console.log('was found in used list');
                        console.log('this will lead to a loss of turn or spin');
                         


                    }else{

                        console.log('was not found in used list');
                        console.log('this is where we will play the board');
                        wheelOfFortune.lettersUsed.push(wheelOfFortune.constSelected.toLowerCase());
                        checkBoardForLetter('constanant',wheelOfFortune.constSelected.toLowerCase());

                    }

                }else{

                    letterMessage.innerHTML = 'Please choose a constanant!';
                    console.log('false logic');

                }

            }else {

                letterMessage.innerHTML = 'You can only choose 1 value at a time';

            }

        }else if(wheelOfFortune.whichButtonIsSelected === 'vowel'){

            //can you afford to buy a vowel
            //is the input a vowel
           console.log('im inside the vowel else if')

            if(letterInput.value.length === 1){
                console.log('vowel was correct size');
                 wheelOfFortune.vowelSelected = letterInput.value.toLowerCase();

                 if(wheelOfFortune.vowelSelected.match(/[a,e,i,o,u]/)){

                     toggleSelectLettersBoxOff();

                     console.log('able to find vowel');
                     if(wheelOfFortune.lettersUsed.includes(wheelOfFortune.vowelSelected)){

                         console.log('this will lead to a new spin or next turn');

                     }else {

                         wheelOfFortune.lettersUsed.push(wheelOfFortune.vowelSelected.toLowerCase());
                         console.log('vowel has not been used yet so see if its on board');
                        checkBoardForLetter('vowel', wheelOfFortune.vowelSelected.toLowerCase());                         
                     }
                 }else {

                     console.log('value is not a vowel');
                 }


            }else {
                console.log('vowel was wrong size');
                letterMessage.innerHTML = "You can only choose 1 value at a time";

            }

        }else {

            //might not need this

        }
        //check to see if letter has already been selected
        //check to see if letter is in array
    }

});


function checkBoardForLetter(vowOrCons, letter){

    let changeInBoard = false;
    let numberOfLettersFound = 0;

    wheelOfFortune.phraseOnBoard.phraseAsArray.forEach(function(each){

        if(each[0].toLowerCase() === letter.toLowerCase()){

            console.log('found the letter ', letter );
            each[1] = 'show';
            console.log(each[0], each[1]);
            changeInBoard = true;
            numberOfLettersFound++;

        }

    })

    if(changeInBoard === true && vowOrCons === 'constanant'){

        renderPhraseBoard(wheelOfFortune.phraseOnBoard.phraseAsArray);

        assignPrize(wheelOfFortune.amountPlayingFor, numberOfLettersFound);
        //continue with new letter guess or spin
        toggleSolveOrSpinOn();


    }else if(changeInBoard === true && vowOrCons === 'vowel'){

        renderPhraseBoard(wheelOfFortune.phraseOnBoard.phraseAsArray);
        deductForVowel();
        //continue with new letter guess or spin

    }else if(changeInBoard === false && vowOrCons === 'vowel'){

        deductForVowel();
        //lose turn 

    }else if(changeInBoard === false && vowOrCons === 'constanant'){

        //lose turn 

    }

    

}



function assignPrize(playingfor, count){


    wheelOfFortune.score += playingfor * count;
    scoreBox.innerHTML = '$' + wheelOfFortune.score;
    letterMessage.innerHTML = 'You won ' + '$' + (playingfor * count) + '!'; 

}

function deductForVowel(){

    wheelOfFortune.score -= wheelOfFortune.costOfVowel;
    scoreBox.innerHTML = '$' + wheelOfFortune.score;

}


$('#buyVowel').on('click', function(){

    wheelOfFortune.whichButtonIsSelected = 'vowel';
    letterMessage.innerHTML = 'You can purchase a vowel for $' + wheelOfFortune.costOfVowel;

});

function renderPhraseBoard(phraseArr){
    textForHTML = '';
    for(var i = 0; i < phraseArr.length; i++){

        if(phraseArr[i][1] === 'space'){

            textForHTML += '<h3 class="letterBoxes" style="background-color:white; border-color:white;">' + ' ' + "</h3>";

        }else if(phraseArr[i][1] === 'show'){

            textForHTML += '<h3 class="letterBoxes" style="background-color:white">' + phraseArr[i][0] + '</h3>';

        }else{

            textForHTML += '<h3 class="letterBoxes" style="background-color: yellow">' + phraseArr[i][0] + "</h3>";
        }        

    }
    phraseBoard.innerHTML = textForHTML;

}

// function solveOrSpin(){

    

// }




//Rendering Functions

function toggleSelectLettersBoxOn(){

    letterMessage.innerHTML = 'Would you like to guess a constanant or buy a vowel?';
    selectLettersBox.style = "display:''";

}

function toggleSelectLettersBoxOff(){

    
    selectLettersBox.style = "display:none";
}

function toggleSolveOrSpinOn(){

    letterMessage.innerHTML = 'Would you like to Solve or Spin?';

    solveOrSpinOptions.style = "display:''";
}

function toggleSolveOrSpinOff(){

    letterMessage.innerHTML = '';
    solveOrSpinOptions.style = "display:none";
}

function toggleSolveInputOn(){

    letterMessage.innerHTML = 'Enter your answer';
    solveInput.style = "display:''";
}

function toggleSolveInputOff(){

    letterMessage.innerHTML = '';
    solveInput.style = "display:none";

}


function toggleSpinButtonOn(){

    spinButton.style = "display:''";

}

function toggleSpinButtonOff(){

    spinButton.style = "display: none";
}

function toggleLetterInputOn(){

    letterInput.style = "display:''";
}

function toggleLetterInputOff(){

    letterInput.style = "display:none";
}

$('#spinOption').on('click', function(){

    toggleSolveOrSpinOff();
    toggleSpinButtonOn();

});

$('#solveOption').on('click', function(){

    toggleSolveOrSpinOff();
    toggleSolveInputOn();

});

$('#solveInput').keypress(function(event){

    if(event.which == 13 || event.which == 'Enter'){

        var testResult = testPhrase(solveInput.value, wheelOfFortune.phraseOnBoard.phrase);
        if(testResult === true){

            //this will be the celebration

        }else {

            //goes to next turn 

        }

    }

});

function testPhrase(solve, test){

    if(solve.toLowerCase() == test.toLowerCase()){

        return true;

    }else {

        return false;

    }

}






//might be able to use set timeout to render new spot
function startRound(){

    wheelOfFortune.phraseOnBoard.turnPhraseToArray(wheelOfFortune.phraseOnBoard.phrase);
    renderPhraseBoard(wheelOfFortune.phraseOnBoard.phraseAsArray);
    toggleSpinButtonOn();


}


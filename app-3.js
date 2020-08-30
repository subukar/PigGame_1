/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


//PROJECT PIG GAME Starts=====================================
 var scores, roundScore, activePlayer,gamePlaying=true,nextDice;
scores=[0,0];//to keep track of global score of both players
roundScore=0;// There will be only one player scoring at a time so one variable taking account of current score
activePlayer=0;//0 for first player, 1 for second player

initialize();

function initialize(){
    //variables for scores 
    
    scores=[0,0];//to keep track of global score of both players
    roundScore=0;// There will be only one player scoring at a time so one variable taking account of current score
    activePlayer=0;//0 for first player, 1 for second player
    gamePlaying=true;
    document.getElementById('win-score').disabled=false;
    alert('Set the maximum score to win the game . The default is 100');
    
    //To change the CSS of some element.
    document.querySelector('.dice').style.display='none';
    document.querySelector('.dice-2').style.display='none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    
    //giving the active class only to player 1 which s a default.
    document.querySelector('.player-0-panel').classList.add('active');
    
    if((isNaN(document.getElementById('win-score').value) )){
        alert('Please type a valid max-score');
    }

}



//variables for dice

//var dice;
//dice=Math.ceil(Math.random()*6);



//DOM Manipulation

//score-0 is the id for round score of 1st player
//current-0 is the id for current score of the 1st player.

//textContent method to change text of the selected HTML element.
//document.querySelector('#current-'+activePlayer).textContent = dice;

//innerHTML method to change HTML of our selected element
//document.querySelector('#current-'+activePlayer).innerHTML= '<em>'+ dice+'</em>';



//To get a value of an HTML element.
//var x= document.querySelector('#current-'+activePlayer).textContent;
//console.log(x);



//document.querySelector('#current-'+activePlayer).textContent = dice;
//document.querySelector('#current-'+activePlayer).innerHTML= '<em>'+ dice+'</em>';
//var x= document.querySelector('#current-'+activePlayer).textContent;
//console.log(x);



//to check for the previous dice value.  //NEW CHANGES


//to set up an event handler


document.querySelector('.btn-roll').addEventListener('click',function(){
    if(gamePlaying){
    //1.generate the random number
    
    var currDice=Math.ceil(Math.random()*6);
    nextDice=Math.ceil(Math.random()*6);
    //console.log(currDice);
    
    //to disable input field when game started.
    document.getElementById('win-score').disabled=true;
    //console.log(document.getElementById('win-score').value);


    //2.display the result
    
    // declaring the variable diceDOM to reuse the big syntax(document.querySelector('.dice')) with a small word
    var diceDOM= document.querySelector('.dice');
    diceDOM.style.display='block';      // display: block will show the contents initially set to none. 
    document.querySelector('.dice-2').style.display='block';
   // document.querySelector('.dice-2').style.animation-iteration-count=1;
    //to change the image of the dice according the rolled dice value
    diceDOM.src= 'dice-'+currDice+'.png';
    document.querySelector('.dice-2').src='dice-'+ nextDice+'.png';
    
    
    //Extended rules:  1.If player rolls two 6 in a row his entire score is lost.
  
    //3. Update the round score if the value rolled is not 1.
    if(currDice!==1 && nextDice!==1){
        //add the score
        roundScore+=currDice+nextDice;
        document.querySelector('#current-'+activePlayer).textContent = roundScore;
   
        
    }
   
    else{
        //Adding a delay of 0.7 sec before changing the turn when a 1 is rolled on a dice.
        setTimeout(nextPlayer,700);
       
    }
    
    }
    
    
 
    
});

//Implementing the 'HOLD' button.

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
    //Add the current score to the global score
    scores[activePlayer] += roundScore;
    
    //Update the UI
    document.querySelector('#score-'+activePlayer).textContent= scores[activePlayer];
    
    var winScore=document.getElementById('win-score').value;
    winScore=(winScore.length===0)?100:winScore;
    
    //Check if the player scores 100 and wins.
    if(scores[activePlayer]>=winScore){
        document.getElementById('name-'+activePlayer).textContent='WINNER';
        document.querySelector('.dice').style.display= 'none';
        document.querySelector('.dice-2').style.display='none';
        document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
        document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
        gamePlaying= false;
  
    }
    else
        {
            // Next Player.
            nextPlayer();
        }
    
    }
    
    
});


function nextPlayer(){
      //change the player.
        
        roundScore=0;
        activePlayer= (activePlayer===0)?1: 0;
        //prev dice becomes 0 if the player gets changed. //NEW CHANGES
       
        
        //setting both the current scores to 0 if player hits 1
        document.getElementById('current-0').textContent='0';
        document.getElementById('current-1').textContent='0';
        
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        //To hide the dice if any player gets a 1
        document.querySelector('.dice').style.display='none';
        document.querySelector('.dice-2').style.display='none';
}



//Creating an initialosation for the game.

document.querySelector('.btn-new').addEventListener('click',initialize);



/*document.querySelector('.rule-heading').addEventListener('click',function(){
    var x=document.querySelector('.game-rules');
    if(x.style.display='none'){
        x.style.display='block';
    }
    else{
        x.style.display='none';
    }
});*/




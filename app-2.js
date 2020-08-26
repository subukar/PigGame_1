/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


//PROJECT PIG GAME Starts=====================================
var scores, roundScore, activePlayer,gamePlaying=true;
scores=[0,0];//to keep track of global score of both players
roundScore=0;// There will be only one player scoring at a time so one variable taking account of current score
activePlayer=0;//0 for first player, 1 for second player
initialize();

function initialize(){
    //variables for scores 

    var scores, roundScore, activePlayer;
    scores=[0,0];//to keep track of global score of both players
    roundScore=0;// There will be only one player scoring at a time so one variable taking account of current score
    activePlayer=0;//0 for first player, 1 for second player
    
    
    //To change the CSS of some element.
    document.querySelector('.dice').style.display='none';


    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    
    //giving the active class only to player 1 which s a default.
    document.querySelector('.player-0-panel').classList.add('active');
    
    document.getElementById('name-0').textContent='PLAYER 1';
    document.getElementById('name-1').textContent='PLAYER 2';
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
var prevDice=0;

//to set up an event handler


document.querySelector('.btn-roll').addEventListener('click',function(){
    if(gamePlaying){
    //1.generate the random number
    
    var currDice=Math.ceil(Math.random()*6);
    console.log(currDice);
    
    //2.display the result
    
    // declaring the variable diceDOM to reuse the big syntax(document.querySelector('.dice')) with a small word
    var diceDOM= document.querySelector('.dice');
    diceDOM.style.display='block';      // display: block will show the contents initially set to none. 
    //to change the image of the dice according the rolled dice value
    diceDOM.src= 'dice-'+currDice+'.png';
    
    //Extended rules:  1.If player rolls two 6 in a row his entire score is lost.
    if(currDice===6 && prevDice===6)
        {
             //NEW CHANGES
            //make the current score of the player as 0 and also the entire score as 0; 
            roundScore=0;
            document.querySelector('#current-'+activePlayer).textContent= roundScore;
            scores[activePlayer]=0;
            document.querySelector('#score-'+activePlayer).textContent=scores[activePlayer];
            prevDice=0;
            //Change the player's turn.
            nextPlayer();
            
        }
    //3. Update the round score if the value rolled is not 1.
    else if(currDice!==1){
        //add the score
        roundScore+=currDice;
        document.querySelector('#current-'+activePlayer).textContent= roundScore;
        prevDice=currDice;    //NEW CHANGES
        
    }
    
        
        
    else{
        nextPlayer();
       
    }
    
    }
    
    
 
    
})

//Implementing the 'HOLD' button.

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
    //Add the current score to the global score
    scores[activePlayer] += roundScore;
    
    //Update the UI
    document.querySelector('#score-'+activePlayer).textContent= scores[activePlayer];
    
    
    
    //Check if the player scores 100 and wins.
    if(scores[activePlayer]>=50){
        document.getElementById('name-'+activePlayer).textContent='WINNER';
        document.querySelector('.dice').style.display= 'none';
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
    
    
})


function nextPlayer(){
      //change the player.
        
        roundScore=0;
        activePlayer= (activePlayer===0)?1: 0;
        //prev dice becomes 0 if the player gets changed. //NEW CHANGES
        prevDice=0;
        
        //setting both the current scores to 0 if player hits 1
        document.getElementById('current-0').textContent='0';
        document.getElementById('current-1').textContent='0';
        
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        //To hide the dice if any player gets a 1
        document.querySelector('.dice').style.display='none';
}



//Creating an initialosation for the game.

document.querySelector('.btn-new').addEventListener('click',initialize);








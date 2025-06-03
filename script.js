/*ui*/
//hide start button after click
//paragraph with instructions
//add input box
//add submit button
//submit calls setRounds()
//setRounds() needs to get value from the input box

/* Global Variables */
var score = [0,0];
var turn = [0,0];
function setUp() {
  let start =  document.createElement("button");
  start.innerHTML = "Play rps";
  start.addEventListener("click",playRps);
  start.id="start";
  document.body.appendChild(start);
}

function playRps(){
  let start = document.getElementById("start");
  start.remove();
  let paragraph = document.createElement("p");
  paragraph.innerHTML="enter an odd number to play";
  paragraph.id="message";
  document.body.appendChild(paragraph);
  let input = document.createElement("input");
  input.id="input";
  input.innerHTML="enter";
  document.body.appendChild(input);
  let enter = document.createElement("button");
  enter.innerHTML = "confirm";
  document.body.appendChild(enter);
  enter.addEventListener("click",getRounds);

  // let winner = "";
  // let rounds = setRounds();
  // for (let round = 1; round <= rounds; round++){
  //   winner = rpsRound();
  //   score[winner]++;
  //   if (score[0]>rounds/2 || score[1] > rounds/2) round=rounds;
  // }
  // let gameWinner = "I";
  // if (score[0]>score[1]) gameWinner = "You";
  // alert("You have "+score[0]+" and I have "+ score[1]+ ", so " + gameWinner + " won:)");
}

function getRounds() {
  let rounds = document.getElementById("input");
  rounds = rounds.value;
  console.log(rounds);
  setRounds(rounds);
}

function setRounds(rounds) {
   if (rounds % 2 == 0) {
     let paragraph = document.getElementById("message");
      paragraph.style.fontWeight="900";
      paragraph.style.color="red";
       let rounds = document.getElementById("input");
       rounds.style.border= "thick solid red";
       rounds.value="";
   }
    // getRounds();
    else {
      document.body.innerHTML="";
      makeButtons();
   }
}

function makeButtons() {
  let buttonArray =[["rock",pickRock],["paper",pickPaper],["scissors",pickScissors]];
  for (let button = 0;button<buttonArray.length;button++){
    let b = document.createElement("button");
    b.innerHTML=(buttonArray[button][0]);
    b.addEventListener("click",buttonArray[button][1]);
    document.body.appendChild(b);
  }
}

function playRound(u) {
  let c=cpuTurn();
  if (u == c) {
    let message = document.createElement("p");
    message.innerHTML="We both chose " + c;
    document.body.appendChild(message); 
  }
  else findWinner();
}

function pickRock() {
  playRound("r");
}

function pickPaper() {
 playRound("p");

}

function pickScissors() {
 playRound("s");
}
/* RPS Round
 * Plays a round of RPS and tells the winner ("I" or "You") won.
 * Returns the index (0,1) in score for the winner.
 * @param: none
 * @return: winner (0 or 1)
 */
function rpsRound() {
    let u = "";
    let c ="";
    while (u == c) {
        u = userTurn();
        c = cpuTurn();
        if (u ==c) {
            // alert("We both chose "  + c);
        }
  }
  winner = findWinner(u,c);
  let winValues = ["You", "I"];
  winnerWord = winValues[winner];
  // alert("You chose " + u + " and I chose "+ c  +  ", so " + winnerWord  +  " won!"); 
  return winner; 
}

/* cpuTurn
 * computer choose between r, p, or s
 * @param:none
 * @return: choice
 */
function cpuTurn() {
    let choice = Math.floor(Math.random()*3);
    let moves = ["r","p","s"];
    return moves[choice];
}

/* findWinner
 * takes user and computer turn
 * decides who the winner is
 * returns winner
 * @param:u,c
 * @return: winner
 */
function findWinner(u,c) {
  let combo = u + c;
  let match = "";
  let winner = "";
  let winArray = [["r","p",0],["r","s",1],["s","r",0],["s","p",1],["p","s",0],["p","r",1]];
  for (let i =0;i < winArray.length;i++) {
    match = winArray[i][0]+winArray[i][1];
    if (match == combo) {
      winner = winArray[i][2];
      break;
    }
  }
  return winner;
}
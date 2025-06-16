/*ui*/
//hide start button after click
//paragraph with instructions
//add input box
//add submit button
//submit calls setRounds()
//setRounds() needs to get value from the input box

/* Global Variables */
var round = 0;
var rounds = 0;
var score = [0,0];
var turn = [0,0];
function setUp() {
  let start =  document.createElement("button");
  start.innerHTML = "Play rps";
  start.style.margin = "10px";
  start.style.color = "#A09C5F";
  start.style.fontSize = "100px";
  start.style.position = 'absolute';
  start.style.left = '50%';
  start.style.top = '50%';
  start.style.transform = 'translate(-50%, -50%)';
  start.style.border = "thick solid #5F5CA3"
  start.style.backgroundColor = "#5F5CA3";
  start.addEventListener("click",playRps);
  start.id="start";
  document.body.appendChild(start);
}

function playRps(){
  let board = document.createElement("div");
  board.id="board";
  document.body.appendChild(board);
  let start = document.getElementById("start");
  start.remove();
  let paragraph = document.createElement("p");
  paragraph.innerHTML="enter an odd number to play";
  paragraph.id="message";
  paragraph.style.color ="#5F5CA3";
  board.appendChild(paragraph);
  let input = document.createElement("input");
  input.id="input";
  input.style.border = "thin  solid #A09C5F";
  input.style.backgroundColor = "#5F5CA3";
  input.style.color = "#A09C5F";
  input.innerHTML="enter";
  board.appendChild(input);
  let enter = document.createElement("button");
  enter.innerHTML = "confirm";
  enter.style.margin = "10px";
  enter.style.backgroundColor = "#5F5CA3";
  enter.style.color = "#A09C5F";
  enter.style.border = "thin solid #5F5CA3";
  board.appendChild(enter);
  enter.addEventListener("click",getRounds);
  input.style.fontSize = "30px";
  enter.style.fontSize = "30px";
  board.style.fontSize = "30px";

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
  rounds = document.getElementById("input");
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
      let board = document.getElementById("board");
      board.innerHTML="";
      makeButtons();
   }
}

function makeButtons() {
  let board = document.getElementById("board");
  let buttons = document.createElement("buttons");
  buttons.id="buttons";
  board.appendChild(buttons); 
  let buttonArray =[["rock",pickRock],["paper",pickPaper],["scissors",pickScissors]];
  for (let button = 0;button<buttonArray.length;button++){
    let b = document.createElement("button");
    b.innerHTML=(buttonArray[button][0]);
    b.addEventListener("click",buttonArray[button][1]);
    buttons.appendChild(b);
  }
}

function playRound(u) {
  let board = document.getElementById("board");
  let c=cpuTurn();
  if (u == c) {
    let message = document.createElement("p");
    message.innerHTML="We both chose " + c;
    board.appendChild(message); 
  }
  else findWinner(u,c);
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
  let winArray = [["r","p",1],["r","s",0],["s","r",1],["s","p",0],["p","s",1],["p","r",0]];
  for (let i =0;i < winArray.length;i++) {
    match = winArray[i][0]+winArray[i][1];
    if (match == combo) {
      winner = winArray[i][2];
      break;
    }
  }
  score[winner]++;
  let winValues = ["You", "I"];
  winnerWord = winValues[winner];
  showScore(u,c,winnerWord);
}

function showScore(u,c, winner) {
  let board = document.getElementById("board");
  round++;
  let header = document.createElement("div");
  header.id="header";
  let content = document.createElement("div");
  content.id="content";
  board.appendChild(header);
  board.appendChild(content);
  let message = "You chose " + u + " and I chose "+ c  +  ", so " + winner  +  " won!"; 
  content.innerHTML=message;
  if (round==rounds){
    let information = "";
    if (score[0] > score[1]) {
      information = "You won "+ score[0] + " to " + score[1];
    }
    else {
       information = "I won "+ score[1] + " to " + score[0];
    }
      content.innerHTML=message+"<br>"+information;
    // board.remove();
    // setUp();
  }
}
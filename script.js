var score = [0,0];
function main() {
    let winner = "";
    let rounds = setRounds();
    if (round <= rounds) {
        winner = rpsRound();
        score[winner]++;
    }

}
function setRounds() {
    let rounds = prompt("Number of rounds?");
   if (rounds % 2 == 0) { 
    alert("must be odd, try again");
   return setRounds();
   }
   return rounds;
}
/* RPS rounds plays round of rps and tells the winner
* @param: none
*@return:none
*/
function rpsRound() {
    let u = "";
  let c ="";
  while (u == c) {
    u = userTurn();
    c = cpuTurn();
    if (u ==c) {
      alert("We both chose "  + c);
    }
  }
  winner = findWinner(u,c);
  alert("You chose " + u + " and I chose "+ c  +  winner  +  " won");  
}
// userturn
// user can choose r, p, or s.
// if bad Input, give new choice
// @param:none
// @return:choice
function userTurn() {
    let choice = prompt("enter r, p, or s");
    const turn = ["r","p","s"];
    if (!turn.includes(choice)) {
        alert("Invalid Input");
        return userTurn();
    }
    return choice;
}
// cpuTurn
// computer choose between r, p, or s
// @param:none
// @return: choice
function cpuTurn() {
    let choice = Math.floor(Math.random()*3);
    let moves = ["r","p","s"];
    return moves[choice];
}
// findWinner
//  takes user and computer turn
// decides who the winner is
// returns winner
// @param:u,c
// @return: winner
function findWinner(u,c) {
  let combo = u + c;
  let match = "";
  let winner = "";
  let winArray = [["r","p","I"],["r","s","You"],["s","r","I"],["s","p","You"],["p","s","I"],["p","r","You"]];
  for (let i =0;i < winArray.length;i++) {
    match = winArray[i][0]+winArray[i][1];
    if (match == combo) {
      winner = winArray[i][2];
      break;
    }
  }
  return winner;
}
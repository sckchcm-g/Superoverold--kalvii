
const strickButton = document.getElementById("strike");
const resetButton = document.getElementById("reset");
const $teamAScore = document.getElementById("score-teamA");
const $teamAWickets = document.getElementById("wickets-teamA");
const $teamBScore = document.getElementById("score-teamB");
const $teamBWickets = document.getElementById("wickets-teamB");

const strickAudio = new Audio("http://bit.ly/so-ball-hit")
const gameOverAudio = new Audio("http://bit.ly/so-crowd-cheer")

var teamAScore = 0;
var teamAWickets = 0;
var teamBScore  = 0;
var teamBWickets = 0;
var teamABallsFaced = 0;
var teamBBallsFaced = 0;
var turn = 1;

const possibleOutComes = [0,1,2,3,4,6,"w"];

function gameover(){
    gameOverAudio.play();
    if(teamAScore>teamBScore) alert("IND wins");
    if(teamBScore>teamAScore) alert("PAK win");
    if(teamBScore=== teamAScore) alert("It is another superover!");
}

function updateScore(){
    $teamAScore.textContent = teamAScore;
    $teamAWickets.textContent = teamAWickets;
    $teamBScore.textContent = teamBScore;
    $teamBWickets.textContent = teamBWickets;
}
resetButton.onclick = () => {
    window.location.reload();
};
strickButton.onclick = () => {
    strickAudio.pause();
    strickAudio.currentTime = 0;
    strickAudio.play();

    const randomElement =possibleOutComes[Math.floor(Math.random()*possibleOutComes.length)];
    console.log(randomElement)
    if(turn===2){
        teamBBallsFaced++;
        document.querySelector(
            `#teamB-superover div:nth-child(${teamBBallsFaced})`
        ).textContent = randomElement;
        if(randomElement==="w"){
            teamBWickets++;    
        }
        else{
            teamBScore += randomElement;
        }
        if(
            teamBBallsFaced === 6 ||
            teamBWickets === 2 ||
            teamBScore>teamAScore
        ){
            turn = 3;
            gameover();
        }
    }

    if(turn===1){
        teamABallsFaced++
        document.querySelector(
            `#teamA-superover div:nth-child(${teamABallsFaced})`
        ).textContent = randomElement;
        if(randomElement==="w"){
            teamAWickets++;
        } else{
            teamAScore += randomElement
        }
        if(teamABallsFaced===6 || teamAWickets===2) turn=2;
    }
    updateScore();
};

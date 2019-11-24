var hasWon = false;
window.rollDice = ()=>{
  if (hasWon) {
    return;
  }
  const max = 6;
  const roll = Math.ceil(Math.random() * max);
  console.log("You rolled", roll);
  let currentPlayer = players[currentPlayerTurn];
  currentPlayer.position += roll;
  ladders.forEach(ladder=>{
    if (ladder.start === currentPlayer.position) {
      console.log("You stepped on a ladder!");
      currentPlayer.position = ladder.end;
    }
  }); // function rolldice

  if (currentPlayer.position >= position) {
    console.log("Player has won!");
    hasWon = true;
  }
  if (currentPlayer.position === position) {
    const diff = currentPlayer.position - position;
    currentPlayerPosition = position - diff;
  }

  currentPlayerTurn ++;
  if (currentPlayerTurn >= players.length) {
    currentPlayerTurn = 0;
  }
  renderBoard();
} // funtion position utk player

const players = [{
  name:"Player1",
  position: 0,
  color: "#7B1FA2"
},{
  name:"Player2",
  position: 0,
  color: "#D32F2F"
}]; // function player style

let currentPlayerTurn = 0;

const width = 6;
const height = 5;
const board = [];
let position = 0;
let blackSquare = true;
const ladders = [{
  start: 7,
  end: 14 //ladders
},{
  start: 18,
  end: 23 //ladders
},{
  start: 22,
  end: 15 //snake
},{
  start:14,
  end: 4 // snake
}];

for (var y = height; y >= 1; y--) {
  let row = [];

  board.push(row);
  for (var x = 1; x < width; x++) {

    row.push({x,y,occupied:null,position,color: blackSquare ? "cyan" : "pink"});
    blackSquare = !blackSquare;
    position ++;
  }
}

const boardSizeConst = 50;
const renderBoard = ()=>{
  let boardHTML = '';
  board.forEach(row=>{
    row.forEach(square=>{
      boardHTML += `<div class=square
      style="top:${square.y * boardSizeConst}px;
      left:${square.x * boardSizeConst}px;
      background-color:${square.color}"></div>`
    });
  });

  players.forEach(player=>{
    let square = null;
    board.forEach(row=>{
    row.forEach(square=>{
          if (square.position === player.position) {
            boardHTML += `<div class=player
            style="top:${square.y * boardSizeConst + 5}px;
            left:${square.x * boardSizeConst + 5}px;
            background-color:${player.color}"></div>`;
          }
      });
    });
  });

  ladders.forEach(ladder=>{

    //let start = 0;
    let startPos = {x:0,y:0};
    let endPos = {x:0,y:0};

    board.forEach(row=>{
      row.forEach(square=>{
        if (square.position === ladder.start) {
          startPos.x = square.x * boardSizeConst;
          startPos.y = square.y * boardSizeConst;
        }

        if (square.position === ladder.end) {
          endPos.x = square.x * boardSizeConst;
          endPos.y = square.y * boardSizeConst;
        }
      });
    });

    const isLadder = ladder.end > ladder.start;

  drawLine({color : isLadder ? "yellow" : "green",startPos,endPos});
    });
    document.getElementById("board").innerHTML = boardHTML;
  }

  function drawLine({color,startPos,endPos}){

    var c=document.getElementById("canvas");
    var ctx=c.getContext("2d");
    ctx.beginPath();
    const sizeRatio = 2;
    ctx.moveTo(startPos.x + 20,startPos.y + 20);
    ctx.lineTo(endPos.x + 20,endPos.y + 20 );

    ctx.lineWidth = 10;
    ctx.strokeStyle = color;
    ctx.stroke();
  }


renderBoard();

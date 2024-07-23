let boxes = document.querySelectorAll(".box"); //select all boxes
let resetBtn = document.querySelector("#reset-btn");  //selecting reset button

let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;//we have 2 players: player X, player O

//8 winning patterns are possible, so let's store them using 2D arrays
const winPatterns = [ [0,1,2],[0,3,6],[0,4,8],[1,4,7],
					  [2,5,8],[2,4,6],[3,4,5],[6,7,8],
                    ];


const resetGame = () =>{
	turnO = true;
	enableBoxes();
	msgContainer.classList.add("hide");
}

boxes.forEach((box)=>{
	box.addEventListener("click", ()=>{
		console.log("box was clicked");
		//if it's player X's turn, box will show X else it will show Y
		if(turnO ===true){
			box.innerText="O";
			turnO = false;
		}
		else{
			box.innerText="X";
			turnO = true;
		}
		box.disabled = true; //to make sure that the choice doesn't change on clicking it again

		//to check who is the winner
		checkWinner();
	});
});

const disableBoxes = ()=>{
	for(let box of boxes){
		box.disabled = true;
	}
}

const enableBoxes = ()=>{
	for(let box of boxes){
		box.disabled = false;
		box.innerText = "";
	}
}

const showWinner = (winner)=>{
	msg.innerText = `Congratulations! Winner is ${winner}`;
	msgContainer.classList.remove("hide");
	disableBoxes(); //to disable all boxes once a winner is found
};

const checkWinner = ()=>{
	//traverse each winning pattern and check for each position to track the winner
	for(let pattern of winPatterns){
		let pos1val = boxes[pattern[0]].innerText;
		let pos2val = boxes[pattern[1]].innerText;
		let pos3val = boxes[pattern[2]].innerText;
		if(pos1val != "" && pos2val != "" && pos3val != "" ){
			if(pos1val === pos2val && pos2val === pos3val){
				console.log("winner");
				showWinner(pos1val);
			}
		}
	}
};

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);



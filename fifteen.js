/*	Kyle Martens
	section AF
	homework 8
	
	This is the javascript for the fifteen puzzle homework. It handles the onclick events for the
	shiffle button, as well as the effects of when boxes are clicked. It will the only move boxes
	that are next to the black square*/

(function() {
	"use strict";

	var BLANK_ROW = 3;
	var BLANK_COL = 3;
	var PUZZLE_ROW_COL_COUNT = 4;
	var BOX_HEIGHT = 100;

	window.onload = function() {
		var shufflebutton = document.getElementById("shufflebutton");
		shufflebutton.onclick = shuffle;

		drawboxes();
	};

	// This function will randomly change a box 1000 times to create a difficult puzzle for the
	// user to solve
	function shuffle() {
		for (var i = 0; i < 1000; i++){
			var neighbors = document.querySelectorAll(".neighbor");
 			var randomNeighbor = parseInt(Math.random() * neighbors.length);
			moveBox(neighbors[randomNeighbor]);
		}
	}

	// Draws all of the boxes for the puzzle area with numbers on all of them
	function drawboxes(){
		var puzzlearea = document.getElementById("puzzlearea");
		for(var row = 0; row < PUZZLE_ROW_COL_COUNT; row++){
			for(var col = 0; col < PUZZLE_ROW_COL_COUNT; col++){
				var boxNumber = PUZZLE_ROW_COL_COUNT * row + (col + 1);
				if(boxNumber < Math.pow(PUZZLE_ROW_COL_COUNT, 2)) {
					// creates one puzzle piece div
					var box = document.createElement("div");
					box.id = "box_" + row + "_" + col;
					box.style.backgroundPosition = (col * -(BOX_HEIGHT)) + "px " +
													(row * -(BOX_HEIGHT)) + "px";
					box.style.top = (row *	BOX_HEIGHT) + "px";
					box.style.left = (col *	BOX_HEIGHT) + "px";
					box.innerHTML = boxNumber;
					box.onclick = clickBox;
					puzzlearea.appendChild(box);
				}
			}
		}
		changeNeighborClass();
	}	

	// This function updates the neighbor classes from the boxes around the blank box
	function changeNeighborClass(){
		var currentNeighbors = document.querySelectorAll(".neighbor");
		for(var n = 0; n < currentNeighbors.length; n++){
			currentNeighbors[n].classList.remove("neighbor");
		}
		var neighbors = [];
		neighbors.push(document.getElementById("box_" + (BLANK_ROW - 1) + "_" + BLANK_COL));
		neighbors.push(document.getElementById("box_" + (BLANK_ROW + 1) + "_" + BLANK_COL));
		neighbors.push(document.getElementById("box_" + BLANK_ROW + "_" + (BLANK_COL - 1)));
		neighbors.push(document.getElementById("box_" + BLANK_ROW + "_" + (BLANK_COL + 1)));
		for(var i = 0; i < neighbors.length; i++){
			if(neighbors[i]){
				neighbors[i].classList.add("neighbor");
			}
		}
	}

	// Triggered when a box is clicked. It calls a function to move the clicked box
	function clickBox(event){
		if(this.classList.contains("neighbor")){
			moveBox(this);
		}
	}

	// Moves the given box parameter to the empty square in the game
	function moveBox(box) {
		var curCol = parseInt(window.getComputedStyle(box).left) / BOX_HEIGHT;
		var curRow = parseInt(window.getComputedStyle(box).top) / BOX_HEIGHT;
		var dx = BLANK_COL - curCol;
		var dy = BLANK_ROW - curRow;
		var newCol = curCol + dx;
		var newRow = curRow + dy;
		var box = document.getElementById("box_" + curRow + "_" + curCol);
		box.style.left = BOX_HEIGHT * newCol + "px";
		box.style.top = BOX_HEIGHT * newRow + "px";
		box.id = "box_" + newRow + "_" + newCol;
		BLANK_ROW = curRow;
		BLANK_COL = curCol;
		changeNeighborClass();
	}

})();
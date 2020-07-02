
// Initialisation

let startBtn = document.getElementById("start");
let quitBtn = document.getElementById("quit");
let menuBtn = document.getElementById("menu");
let settingBtn=document.getElementById("setting");
let interval;


let homePageText="Really, You quit !!";
let homePageScore;
const mainMenu = document.querySelector("#nav_menu");
let homePage = document.querySelector("#homepage");

startBtn.addEventListener("click", startGame);

quitBtn.addEventListener("click", stopGame);


menuBtn.addEventListener("click", function () {
	if(boolmenu){
	mainMenu.classList.add("active");
}
});


settingBtn.addEventListener("click", function (event) {
	event.preventDefault();
	mainMenu.classList.remove("active");
	settingGame();
});



function textGame() {
	scoreFinal();
	homePage.innerHTML = homePageText +"<br>" + homePageScore;
	homePage.classList.remove("active");
}



let boolstop=true;
let boolstart=true;
let boolmenu=true;

function stopGame() {
	if(boolstop){
	textGame();
	clearInterval(interval);
	setTimeout(setupInitialization, 3000);
	boolstop=false;
	}
}

function setupInitialization() {
	boolstop=true;
	boolstart=true;
	console.log("refresh2");
	setTimeout(location.reload(true), 1000);
}

function startGame() {
	
	if(boolstart){
		settingGame();	
		homePage.classList.add("active");
		enemyCreation();
		interval = setInterval(updateTime, 1000);
		startTimer();	
		boolstart=false;
		boolmenu=false;
	}
}

// Récupération des settings



let timerset;
let lifeset;



function settingGame(){
	console.log("test");
	if (document.getElementById('easy').checked) {
		sizeCell=50;
		sizeGameboard=500;
		nbEnemy=5;
	   }
	 if (document.getElementById('medium').checked) {
		sizeCell=50;
		sizeGameboard=600;
		nbEnemy=10;
	   }
	if (document.getElementById('hard').checked) {
		sizeCell=20;
		sizeGameboard=700;
		nbEnemy=20;
		
	   }
	   player.classList.add("walkdown");
	   player.style.height = sizeCell + 'px';
	   player.style.width = sizeCell + 'px';
	   gameboard.style.height = sizeGameboard + 'px';
	   gameboard.style.width = sizeGameboard + 'px';

	   if (document.getElementById('timersetyes').checked) {
		timerset=true;
	   }

	   if (document.getElementById('timersetno').checked) {
		timerset=false;
	   }

	   if (document.getElementById('lifesetyes').checked) {
		lifeset =true;
	   }

	   if (document.getElementById('lifesetno').checked) {
		lifeset =false;
	   }
	   
		  
}


// Taille du jeu
let sizeGameboard;
let sizeCell;
let nbEnemy;
let lifeCount=5;
let timer = 50;
let score = 0;






const player = document.querySelector(".player");
const gameboard = document.querySelector(".gameboard");
const audio = document.querySelector(".audio");



let lifedisplay = document.getElementById("life");
let enemydisplay = document.getElementById("enemy");
let timerdisplay = document.getElementById("timer");
let scoredisplay = document.getElementById("score");
lifedisplay.innerHTML = lifeCount + "  vies  restantes";
enemydisplay.innerHTML = "Enemies : " + nbEnemy;
scoredisplay.innerHTML = "Your score : <br>" + score;







// Déplacement du joueur



window.addEventListener("keydown", function (event) {
	let touch = event.code;
	let x = player.offsetLeft;
	let y = player.offsetTop;
	player.classList.remove("walkdown", "walkup", "walkleft", "walkright");
	switch (touch) {

		case 'Space':
			bombCreation(x, y);
			bombNb.push();
			break;

		case 'ArrowLeft':
			x -= sizeCell;
			player.classList.add("walkleft");
			break;

		case 'ArrowDown':
			y += sizeCell;
			player.classList.add("walkdown");
			break;

		case 'ArrowRight':
			x += sizeCell;
			player.classList.add("walkright");
			break;

		case 'ArrowUp':
			y -= sizeCell;
			player.classList.add("walkup");
			break;

		default:

	}
	if (x >= 0 && x < sizeGameboard) {
		player.style.left = String(x) + 'px';
		walkSong();
	}
	else { wallSong(); }

	if (y >= 0 && y < sizeGameboard) {
		player.style.top = String(y) + 'px';

	} else { wallSong(); }

	playerLife();
});





// Création des bombes


let bomb;
let bombNb = [];
let bombX = [];
let bombY = [];
let bombD = [];


function bombCreation(x, y) {
	let i = bombNb.length;
	bombNb[i] = document.createElement("div");
	bombNb[i].classList.add("bomb");
	gameboard.appendChild(bombNb[i]);

	bombX[i] = x;
	bombY[i] = y;
	bombNb[i].style.height = sizeCell + 'px';
	bombNb[i].style.width = sizeCell + 'px';
	bombNb[i].style.left = String(x) + 'px';
	bombNb[i].style.top = String(y) + 'px';

	bombD[i] = Math.floor((Date.now() + 2000) / 100);


}


function bombExploded() {
	let date = Math.floor(Date.now() / 100);

	for (let i = 0; i < bombD.length; i++) {

		if (date > bombD[i]) {
			gameboard.removeChild(bombNb[i]);
			bombX.splice(i, 1);
			bombY.splice(i, 1);
			bombD.splice(i, 1);
			bombNb.splice(i, 1);
			console.log(bombNb);
		}

	}

}




// Création des ennemis

let enemyX = [];
let enemyY = [];
let enemyNb = [];

function enemyCreation() {
	for (let i = 0; i < nbEnemy; i++) {
		enemyX[i] = Math.floor(Math.random() * sizeGameboard / sizeCell) * sizeCell;
		enemyY[i] = Math.floor(Math.random() * sizeGameboard / sizeCell) * sizeCell;
		enemyNb[i] = document.createElement("div");
		enemyNb[i].classList.add("enemy");
		gameboard.appendChild(enemyNb[i]);
		enemyNb[i].style.height = sizeCell + 'px';
		enemyNb[i].style.width = sizeCell + 'px';
	}

	checkPosition();
}





// Déplacement des ennemis chaque intervalle de temps

// Mise à jour des coordonnées

function updatePosition(i) {
	let x = enemyX[i];
	let y = enemyY[i];
	let position = Math.floor(Math.random() * 4);

	switch (position) {

		case 0:
			x -= sizeCell;
			break;

		case 1:
			x += sizeCell;
			break;

		case 2:
			y -= sizeCell;
			break;

		case 3:
			y += sizeCell;
			break;

		default:

	}
	if (x >= 0 && x < sizeGameboard) {
		enemyX[i] = x;

	} else {
		updatePosition(i);
	}

	if (y >= 0 && y < sizeGameboard) {
		enemyY[i] = y;

	} else {
		updatePosition(i);
	}
}


// Vérification des positions entre ennemis
function checkPosition() {

	for (let i = 0; i < enemyNb.length; i++) {

		if (enemyNb.length > 1) {

			for (let n = i + 1; n < enemyNb.length; n++) {

				if (enemyX[i] == enemyX[n]) {

					if (enemyY[i] == enemyY[n]) {
						updatePosition(n);
						displayPosition(i);
					}

					else {
						displayPosition(i);

					}
				}
				else {

					displayPosition(i);

				}
				displayPosition(n);
			}

		} else {

			displayPosition(i);

		}



	}

}



// Affichage des ennemis à l'écran

function displayPosition(number) {
	let x = enemyX[number];
	let y = enemyY[number];

	enemyNb[number].style.left = String(x) + 'px';

	enemyNb[number].style.top = String(y) + 'px';

}






// Ennemis dead

function checkDestroy() {

	let date = Math.floor(Date.now() / 100);

	for (let i = 0; i < bombD.length; i++) {
		console.log(bombD.length);
		if (date >= bombD[i] + 2 && date >= (bombD[i] - 8)) {
			bombSong();
			let explodeXmin = bombX[i] - sizeCell - 1;
			let explodeXmax = bombX[i] + 2 * sizeCell - 1;
			let explodeYmin = bombY[i] - sizeCell - 1;
			let explodeYmax = bombY[i] + 2 * sizeCell - 1;
			let x = player.offsetLeft;
			let y = player.offsetTop;

			for (let n = 0; n < enemyNb.length; n++) {

				if (enemyX[n] >= explodeXmin && enemyX[n] < explodeXmax && enemyY[n] >= explodeYmin && enemyY[n] < explodeYmax) {

					enemyDestroy(n);
				}
			}
			if (x >= explodeXmin && x < explodeXmax && y >= explodeYmin && y < explodeYmax) {

				playerDead();
			}


		}
	}


}




function enemyDestroy(number) {
	let i = number;
	gameboard.removeChild(enemyNb[i]);
	enemyNb.splice(i, 1);
	enemyY.splice(i, 1);
	enemyX.splice(i, 1);
	console.log(enemyNb);
	enemyDeathSong();
	enemyDead();

}






// Fonction de mise à jour de l'écran ennemis et bombes

function updateTime() {
	for (let i = 0; i < enemyNb.length; i++) {
		updatePosition(i);
	}

	checkPosition();
	checkDestroy();
	bombExploded();
	playerLife();
}





// Vérification des collisions avec le joueur

function playerLife() {
	let x = player.offsetLeft;
	let y = player.offsetTop;

	for (let i = 0; i < enemyNb.length; i++) {
		if (x == enemyX[i] && y == enemyY[i]) {
			playerDead();

		}

	}

}



// Joueur dead
function playerDead() {
	lifeCount--;

	if (lifeCount == 0) {
		homePageText = "GAME OVER!!!<br>Try again!";
		overSong();
		stopGame();
		return homePageText;
	}
	else if (lifeCount == 1) {
		lifedisplay.innerHTML = lifeCount + "  vie  restante";
		lifeSong();
	}
	else {
		lifedisplay.innerHTML = lifeCount + "  vies  restantes";
		lifeSong();
	}

}


// Ennemis restants

function enemyDead() {
	nbEnemy--;

	if (nbEnemy == 0) {
		homePageText = "YOU WIN!!!<br>Play again!";
		scoreEnemy();
		winSong();
		stopGame();
		return homePageText;
	}
	else {
		enemydisplay.innerHTML = "Enemies : " + nbEnemy;
		scoreEnemy();

	}

}




// Compte à rebours



let intervalId;
function finishTime() {
	clearInterval(intervalId);
	timerdisplay.innerHTML = "Time : " + timer;
	homePageText = "GAME OVER!!!<br>Try again!";
	overSong();
	stopGame();
	return homePageText;
}
function bip() {
	timer--;
	if (timer == 0) {
		finishTime();
	}
	else {
		timerdisplay.innerHTML = "Time : " + timer;
	}
}
function startTimer() {
	if(timerset){
	intervalId = setInterval(bip, 1000);
}else{timerdisplay.innerHTML = "Time : infinity ";}
}





// Score du joueur
let scoreEnemyDead=0;

function scoreEnemy() {
	score += 100;
	scoreEnemyDead++;
	scoredisplay.innerHTML = "Your score : <br>" + score;
	return score;
}

function scoreFinal() {
	score += timer *10*scoreEnemyDead;
	homePageScore = "Your score : <br>" + score;
	return homePageScore;
}




// Theme song---------------------------------------------------------------------------------------------------//
/*
let theme_song=document.createElement('audio');
 let first=true;
      window.addEventListener('mousedown',onmousedown);
 
    function onmousedown(){
       if(!first) return;
       first=false;
	   theme_song.src="lib/theme.ogg";
	   theme_song.setAttribute("loop","true");
	   theme_song.volume=0.2;
       theme_song.play();
	}

*/

let songOver = document.createElement('audio');
let songWin = document.createElement('audio');


let wall_song = document.createElement('audio');
let songLife = document.createElement('audio');

let songEnemy = document.createElement('audio');
let walk_song = document.createElement('audio');
let songBomb = document.createElement('audio');



songOver.volume = 0.5;
songWin.volume = 0.5;


wall_song.volume = 0.2;
songLife.volume = 0.5;

songEnemy.volume = 0.5;
walk_song.volume = 0.05;
songBomb.volume = 0.5;



function walkSong() {
	walk_song.src = "lib/walk.ogg";
	walk_song.play();
}

function wallSong() {
	wall_song.src = "lib/wall.ogg";
	wall_song.play();
}



function overSong() {
	songOver.src = "lib/gameover.mp3";
	songOver.play();

}


function lifeSong() {
	songLife.src = "lib/lifelose.mp3";
	songLife.play();

}


function winSong() {
	songWin.src = "lib/wingame.mp3";
	songWin.play();
	console.log("win");
}



function enemyDeathSong() {

	songEnemy.src = "lib/enemydeath.mp3";
	songEnemy.play();


}


function bombSong() {

	songBomb.src = "lib/bomb_explosion.wav";
	songBomb.play();

}

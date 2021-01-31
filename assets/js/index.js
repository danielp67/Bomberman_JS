
// Initialisation

let startBtn = document.getElementById("start");
let quitBtn = document.getElementById("quit");
let menuBtn = document.getElementById("menu");
let settingBtn = document.getElementById("setting");
let interval;

let boolstop = false;
let boolstart = true;
let boolmenu = true;
let boolplayer = false;


let homePageText = "Really, You quit !!";
let homePageScore;
const mainMenu = document.querySelector("#nav_menu");
let homePage = document.querySelector("#homepage");

startBtn.addEventListener("click", startGame);

quitBtn.addEventListener("click", stopGame);


menuBtn.addEventListener("click", function () {
	if (boolmenu) {
		mainMenu.classList.remove("right");
		mainMenu.classList.add("active");
	}
});


settingBtn.addEventListener("click", function (event) {
	event.preventDefault();
	mainMenu.classList.remove("active");
	mainMenu.classList.add("inactive");
	settingGame();
});




function stopGame() {
	if (boolstop) {
		scoreFinal();
		homePage.innerHTML = homePageText + "<br>" + homePageScore;
		homePage.classList.remove("active");
		homePage.classList.add("inactive");

		clearInterval(interval);
		boolstop = false;

		setTimeout(function () {
			boolstop = true;
			boolstart = true;
			location.reload(true);
		}, 4000);

	}
}

function startGame() {

	if (boolstart) {
		settingGame();
		homePage.classList.remove("down");
		homePage.classList.add("active");
		mainMenu.classList.remove("active");
		enemyCreation();
		interval = setInterval(updateTime, speed);
		startTimer();
		boolstart = false;
		boolmenu = false;
		boolplayer = true;
		boolstop = true;
	}
}

// Récupération des settings

let sizeGameboard;
let sizeCell;
let nbEnemy;
let lifeCount = 5;
let timer = 50;
let score = 0;
let speed;
let timerset;
let lifeset;


const player = document.querySelector(".player");
const gameboard = document.querySelector(".gameboard");
const audio = document.querySelector(".audio");


let lifedisplay = document.getElementById("life");
let enemydisplay = document.getElementById("enemy");
let timerdisplay = document.getElementById("timer");
let scoredisplay = document.getElementById("score");






function settingGame() {


	if (document.getElementById('easy').checked) {
		sizeCell = 50;
		sizeGameboard = 500;
		nbEnemy = 5;
		speed = 1000;
	}
	if (document.getElementById('medium').checked) {
		sizeCell = 50;
		sizeGameboard = 600;
		nbEnemy = 10;
		speed = 1000;
	}
	if (document.getElementById('hard').checked) {
		sizeCell = 20;
		sizeGameboard = 700;
		nbEnemy = 20;
		speed = 500;

	}
	if (screen.width < 500) {
		sizeCell = 40;
		sizeGameboard = 320;
		nbEnemy = 7;
		speed = 1000;
	}
	player.classList.add("walkdown");
	player.style.height = sizeCell + 'px';
	player.style.width = sizeCell + 'px';
	gameboard.style.height = sizeGameboard + 'px';
	gameboard.style.width = sizeGameboard + 'px';
	enemydisplay.innerHTML = "Enemies : " + nbEnemy;
	scoredisplay.innerHTML = "Your score : <br>" + score;

	if (document.getElementById('timersetyes').checked) {
		timerset = true;
	}

	if (document.getElementById('timersetno').checked) {
		timerset = false;
	}

	if (document.getElementById('lifesetyes').checked) {
		lifeset = true;
		lifedisplay.innerHTML = lifeCount + "  lifes remaining";
	}

	if (document.getElementById('lifesetno').checked) {
		lifeset = false;
		lifedisplay.innerHTML = "You are invincible !"
	}


}


// Déplacement du joueur  FOR MOBILE VERSION



gameboard.addEventListener("touchstart", function (event) {
	touchstartX = event.changedTouches[0].screenX;
	touchstartY = event.changedTouches[0].screenY;
}, false);

gameboard.addEventListener("touchend", function (event) {
	touchendX = event.changedTouches[0].screenX;
	touchendY = event.changedTouches[0].screenY;
	handleGesure();
}, false);

function handleGesure(){
	if (boolplayer) {
		let x = player.offsetLeft;
		let y = player.offsetTop;
		player.classList.remove("walkdown", "walkup", "walkleft", "walkright");
		console.log(touchstartX, touchstartY);
		console.log(touchendX, touchendY);
		if (touchendY == touchstartY) {
			bombCreation(x, y);
			bombNb.push();
			setTimeout(bombSong, 1000);
		}

		if (touchendX < touchstartX-10) {
			x -= sizeCell;
			player.classList.add("walkleft");
		}

		if (touchendY > touchstartY+10) {
			y += sizeCell;
			player.classList.add("walkdown");
		}

		if (touchendX > touchstartX+10) {
			x += sizeCell;
			player.classList.add("walkright");
		}

		if (touchendY < touchstartY-10) {
			y -= sizeCell;
			player.classList.add("walkup");
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
	}
}



// Déplacement du joueur



window.addEventListener("keydown", function (event) {
	if (boolplayer) {
		let touch = event.code;
		let x = player.offsetLeft;
		let y = player.offsetTop;
		player.classList.remove("walkdown", "walkup", "walkleft", "walkright");
		switch (touch) {

			case 'Space':
				bombCreation(x, y);
				bombNb.push();
				setTimeout(bombSong, 1000);
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
				player.classList.add("walkdown");
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
	}
});




// Création des bombes


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

let enemy = [];
let enemyNb = [];
let enemyPos=[];


// POO version


function enemyCreation() {
	for (let i = 0; i < nbEnemy; i++) {
		enemy[i] = new Enemy(i);
		enemy[i].creation();
	}

	checkPosition();
}


class Enemy {
	constructor(i){
		this.i=i;
	}
	creation() {
		let x;
		let y;

		x = Math.floor(Math.random() * sizeGameboard / sizeCell) * sizeCell;
		y = Math.floor(Math.random() * sizeGameboard / sizeCell) * sizeCell;
		enemyNb[this.i] = document.createElement("div");
		enemyNb[this.i].classList.add("enemy");
		gameboard.appendChild(enemyNb[this.i]);
		enemyNb[this.i].style.height = sizeCell + 'px';
		enemyNb[this.i].style.width = sizeCell + 'px';
		enemyPos[this.i] =[x,y];

		return enemyPos;
	}

	display(){
		let x = enemyPos[this.i][0];
		let y = enemyPos[this.i][1];

		enemyNb[this.i].style.left = String(x) + 'px';
		enemyNb[this.i].style.top = String(y) + 'px';

	}

	destroy() {
		gameboard.removeChild(enemyNb[this.i]);
		enemyNb.splice(this.i, 1);
		enemyPos.splice(this.i, 1);
		console.log(enemy);
		console.log(enemyNb);
		console.log(enemyPos);
		enemyDeathSong();
		Enemy.enemyDead();

	}

	static enemyDead() {
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

}


// Déplacement des ennemis chaque intervalle de temps

// Mise à jour des coordonnées

function updatePosition(i) {
	let x = enemyPos[i][0];
	let y = enemyPos[i][1];
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
		enemyPos[i][0] = x;

	} else {
		updatePosition(i);
	}

	if (y >= 0 && y < sizeGameboard) {
		enemyPos[i][1] = y;

	} else {
		updatePosition(i);
	}
}


// Vérification des positions entre ennemis
function checkPosition() {

	for (let i = 0; i < enemyPos.length; i++) {

		if (enemyPos.length > 1) {

			for (let n = i + 1; n < enemyPos.length; n++) {

				if (enemyPos[i][0] == enemyPos[n][1]) {

					if (enemyPos[i][1] == enemyPos[n][1]) {
						do {
							updatePosition(n);

						}
						while (enemyPos[i][1] == enemyPos[n][1] && enemyPos[i][0] == enemyPos[n][1]);
						enemy[i].display();
					}

					else {
						enemy[i].display();

					}
				}
				else {

					enemy[i].display();
				}
				enemy[n].display();
			}

		} else {

			enemy[i].display();

		}



	}

}




function checkDestroy() {

	let date = Math.floor(Date.now() / 100);

	for (let i = 0; i < bombD.length; i++) {
		console.log(bombD.length);
		if (date >= bombD[i] + 2 && date >= (bombD[i] - 8)) {

			let explodeXmin = bombX[i] - sizeCell - 1;
			let explodeXmax = bombX[i] + 2 * sizeCell - 1;
			let explodeYmin = bombY[i] - sizeCell - 1;
			let explodeYmax = bombY[i] + 2 * sizeCell - 1;
			let x = player.offsetLeft;
			let y = player.offsetTop;

			for (let n = 0; n < enemyPos.length; n++) {

				if (enemyPos[n][0] >= explodeXmin && enemyPos[n][0] < explodeXmax && enemyPos[n][1] >= explodeYmin && enemyPos[n][1] < explodeYmax) {

					enemy[n].destroy();
				}
			}
			if (x >= explodeXmin && x < explodeXmax && y >= explodeYmin && y < explodeYmax) {

				playerDead();
			}


		}
	}


}





// Vérification des collisions avec le joueur

function playerLife() {
	let x = player.offsetLeft;
	let y = player.offsetTop;

	for (let i = 0; i < enemyNb.length; i++) {
		if (x == enemyPos[i][0] && y == enemyPos[i][1]) {
			playerDead();

		}

	}

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





// --------------------------------Affichage et gestion de fin de jeu---------------------------------------//
// ---------------------------------------------------------------------------------------------------------//
// ---------------------------------------------------------------------------------------------------------//


// Joueur dead
function playerDead() {
	if (lifeset) {
		lifeCount--;

		if (lifeCount == 0) {
			homePageText = "GAME OVER!!!<br>Try again!";
			overSong();
			stopGame();
			return homePageText;
		}
		else if (lifeCount == 1) {
			lifedisplay.innerHTML = lifeCount + "  life remaining";
			lifeSong();
		}
		else {
			lifedisplay.innerHTML = lifeCount + "  lifes remaining";
			lifeSong();
		}
	} else { lifedisplay.innerHTML = "You are invincible !"; }
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
	return timer;
}
function startTimer() {
	if (timerset) {
		intervalId = setInterval(bip, 1000);
	} else { timerdisplay.innerHTML = "Time : infinity "; }
}





// Score du joueur
let scoreEnemyDead = 0;

function scoreEnemy() {
	score += 100;
	scoreEnemyDead++;
	scoredisplay.innerHTML = "Your score : <br>" + score;
	return score;
}

function scoreFinal() {
	if (timerset) {
		score += timer * 10 * scoreEnemyDead;
		homePageScore = "Your score : <br>" + score;
	} else {
		homePageScore = "Your score : <br>" + score;
	}
	return homePageScore;
}

// --------------------------------------------AUDIO-----------------------------------------------------------//
// ------------------------------------------------------------------------------------------------------------//
// -------------------------------------------Theme song--------------------------------------------------------//


let theme_song = document.createElement('audio');
let first = true;
window.addEventListener('mousedown', onmousedown);

function onmousedown() {
	if (!first) return;
	first = false;
	theme_song.src = "lib/theme.ogg";
	theme_song.setAttribute("loop", "true");
	theme_song.volume = 0.2;
	theme_song.play();
}



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

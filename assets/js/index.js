
// Taille du jeu

const sizeGameboard =500;
const sizeCell=50;
const nbEnemy=5;
let lifeCount=5;



const player = document.querySelector(".player");
const gameboard = document.querySelector(".gameboard");
const menu = document.querySelector(".menu");
let life= document.getElementById("life");
life.innerHTML = lifeCount + " vie restantes";



player.style.height=sizeCell+'px';
player.style.width=sizeCell+'px';


gameboard.style.height=sizeGameboard+'px';
gameboard.style.width=sizeGameboard+'px';


// Déplacement du joueur

window.addEventListener("keydown", function(event) {
	let touch=event.code;
	let x = player.offsetLeft;
	let y = player.offsetTop;

	switch (touch) {
		
		case 'Space':	
			bombCreation(x,y);
			bombNb.push();
			break;
		
		case 'ArrowLeft':
			x-=sizeCell;		
			break;
		
		case 'ArrowDown':
			y+=sizeCell;
			break;
		
		case 'ArrowRight':
			x+=sizeCell;
			break;
		
		case 'ArrowUp':
			y-=sizeCell;
			break;
		
		default:

	}
if(x>=0 && x<sizeGameboard){
	player.style.left= String(x)+'px';
}

if(y>=0 && y<sizeGameboard){
	player.style.top= String(y)+'px';

}
	playerLife();
});

// Création des bombes

let bomb;
let bombNb=[];
let bombX=[];
let bombY=[];
let bombD=[];



console.log(bombNb.length);

function bombCreation(x,y){
	let i=bombNb.length;
	bombNb[i]=document.createElement("div");
	bombNb[i].classList.add("bomb");
	gameboard.appendChild(bombNb[i]);
	
	bombX[i]=x;
	bombY[i]=y;
	bombNb[i].style.height=sizeCell+'px';
	bombNb[i].style.width=sizeCell+'px';
	bombNb[i].style.left= String(x)+'px';
	bombNb[i].style.top= String(y)+'px';

	bombD[i]=Math.floor((Date.now()+2000) / 100);
	

}


function bombExploded(){
	let date= Math.floor(Date.now() / 100);
		
	for(let i=0;i<bombD.length;i++){
				if(date>bombD[i]){
						gameboard.removeChild(bombNb[i]);	
						bombX.splice(i,1);
						bombY.splice(i,1);
						bombD.splice(i,1);
						bombNb.splice(i,1);
						console.log(bombNb);
				}
						
		}	
			
}
		
	


// Création des ennemis

let enemyX=[];
let enemyY=[];
let enemyNb=[];

function enemyCreation(){
	for(let i=0; i<nbEnemy; i++){
		enemyX[i]=Math.floor(Math.random()*sizeGameboard/sizeCell)*sizeCell;
		enemyY[i]=Math.floor(Math.random()*sizeGameboard/sizeCell)*sizeCell;
		enemyNb[i]=document.createElement("div");
		enemyNb[i].classList.add("enemy");
		gameboard.appendChild(enemyNb[i]);
		enemyNb[i].style.height=sizeCell+'px';
		enemyNb[i].style.width=sizeCell+'px';
	}
	
	checkPosition();
}

enemyCreation();



	// Déplacement des ennemis chaque intervalle de temps

	// Mise à jour des coordonnées

function updatePosition(i){
		let x = enemyX[i];
		let y = enemyY[i];
		let position=Math.floor(Math.random()*4);

		switch (position) {

			case 0:
				x-=sizeCell;		
				break;
			
			case 1:
				x+=sizeCell;
				break;
			
			case 2:
				y-=sizeCell;
				break;
			
			case 3:
				y+=sizeCell;
				break;
			
			default:
	
		}
		if(x>=0 && x<sizeGameboard){
			enemyX[i]=x;
			
		}else {updatePosition(i);
		}

		if(y>=0 && y<sizeGameboard){
			enemyY[i]=y;
		
		}else {updatePosition(i);		
		}
	}


		// Vérification des positions entre ennemis
function checkPosition(){
	
		for(let i=0; i<enemyNb.length; i++){

			if(enemyNb.length>1){

				for(let n=i+1; n<enemyNb.length;n++){
					
					if(enemyX[i]==enemyX[n]){

						if(enemyY[i]==enemyY[n]){
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

			}else {
						
				displayPosition(i);
				
			}
			

		
		}
	 
}



		// Affichage des ennemis à l'écran

function displayPosition(number){
	let x=enemyX[number];
	let y=enemyY[number];

		enemyNb[number].style.left= String(x)+'px';

		enemyNb[number].style.top= String(y)+'px';

}	






// Ennemis dead

function checkDestroy(){
	
	let date= Math.floor(Date.now() / 100);

	for(let i=0;i<bombD.length;i++){
		console.log(bombD.length);
		if(date>=bombD[i]+2 && date>=(bombD[i]-8)){
			let explodeXmin=bombX[i]-sizeCell-1;
			let explodeXmax=bombX[i]+2*sizeCell-1;
			let explodeYmin=bombY[i]-sizeCell-1;
			let explodeYmax=bombY[i]+2*sizeCell-1;
			let x = player.offsetLeft;
			let y = player.offsetTop;
			
				for(let n=0;n<enemyNb.length;n++){
					
						if(enemyX[n]>=explodeXmin && enemyX[n]<explodeXmax && enemyY[n]>=explodeYmin && enemyY[n]<explodeYmax){			
					
							enemyDestroy(n);
						}
				}
			if(x>=explodeXmin && x<explodeXmax && y>=explodeYmin && y<explodeYmax){			
					
				playerDead();
			}

												
		}
	}
	
	
	}
	
	


function enemyDestroy(number){
	let i=number;
		gameboard.removeChild(enemyNb[i]);
		enemyNb.splice(i,1);
		enemyY.splice(i,1);
		enemyX.splice(i,1);
		console.log(enemyNb);
																
}






		// Fonction de mise à jour de l'écran ennemis et bombes

	function updateTime(){
		
		for(let i=0; i<enemyNb.length; i++){
			updatePosition(i);	
		
		}
		
		checkPosition();
		checkDestroy();
		bombExploded();
		playerLife();
		
	}


		// Interval de mise à jour

	let interval=setInterval(updateTime,1000);


	

// Vérification des collisions avec le joueur

function playerLife(){
	let x = player.offsetLeft;
	let y = player.offsetTop;
	
	for(let i=0; i<enemyNb.length;i++){
		if(x==enemyX[i] && y==enemyY[i]){
			playerDead();
		}
		
	}

}



// Joueur dead
function playerDead(){
	lifeCount--;
	if(lifeCount == 0) {
		life.innerHTML = "GAME OVER!";
		
		startMenu();
	}
	
    else {	
        life.innerHTML = lifeCount + " vie restantes";
    }	

}




function startMenu(){
		
}

// Taille du jeu

const sizeGameboard =500;
const sizeCell=50;
const nbEnemy=5;



const player = document.querySelector(".player");
const gameboard = document.querySelector(".gameboard");

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

});

// Création des bombes

let bomb;
let bombNb=[];
let bombX=[];
let bombY=[];
let bombD=[];
let date;


console.log(bombNb.length);

function bombCreation(x,y){
	let i=bombNb.length;
	bombNb[i]=document.createElement("div");
	bombNb[i].classList.add("bomb");
	
	gameboard.appendChild(bombNb[i]);
	bombNb[i].style.left= String(x)+'px';
	bombNb[i].style.top= String(y)+'px';
	
	
	bombX[i]=x;
	bombY[i]=y;
	bombD[i]=Math.floor((Date.now()+2000) / 100);
	

}

/*
function bombDisplay(){
	for(let i=0; i<bombNb.length;i++){
		let x=bombX[i];
		let y=bombY[i];

		bombNb[i].style.left= String(x)+'px';

		bombNb[i].style.top= String(y)+'px';
		let bombDuration=setTimeout(checkDestroy,2500,x,y);

	}

}
*/

function bombExploded(){
	date= Math.floor(Date.now() / 100);
console.log(bombD);
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
let enemyNb;

function enemyCreation(){
	for(let i=0; i<nbEnemy; i++){
		enemyX[i]=Math.floor(Math.random()*10)*sizeCell;
		enemyY[i]=Math.floor(Math.random()*10)*sizeCell;
		let enemy=document.createElement("div");
		enemy.classList.add("enemy");
		gameboard.appendChild(enemy);
	}
	
	enemyNb=document.querySelectorAll(".enemy");
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
			enemyY[i]=y;;
		
		}else {updatePosition(i);		
		}
	}


		// Vérification des positions entre ennemis
function checkPosition(){
	
	for(let i=0; i<enemyNb.length; i++){

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
		

	
	}
	 
}



		// Affichage des ennemis à l'écran

function displayPosition(number){
	let x=enemyX[number];
	let y=enemyY[number];

		enemyNb[number].style.left= String(x)+'px';

		enemyNb[number].style.top= String(y)+'px';

}	




		// Fonction de mise à jour de l'écran ennemis et bombes

	function updateTime(){
		
		for(let i=0; i<enemyNb.length; i++){
			
			updatePosition(i);
			
		}
		
		checkPosition();
		bombExploded();
		
	}


		// Interval de mise à jour

	let interval=setInterval(updateTime,1000);


	

// Vérification des collisions avec le joueur




// Ennemis dead

function checkDestroy(x,y){

	let bombX=x;
	let bombY=y;

	let explodeXmin=bombX-50;
	let explodeXmax=bombX+100;
	let explodeYmin=bombY-50;
	let explodeYmax=bombY+100;


	for(let i=0; i<enemyNb.length; i++){

				if(enemyX[i]>=explodeXmin && enemyX[i]<explodeXmax && enemyY[i]>=explodeYmin && enemyY[i]<explodeYmax){

					alert("toucher");
				}
				
				
			}

}


function enemyDestroy(number){
	

		gameboard.removeChild(enemyNb[i]);


}


// Joueur dead



// Déplacement du joueur
const player = document.querySelector(".player");
const gameboard = document.querySelector(".gameboard");


window.addEventListener("keydown", function(event) {
	let touch=event.code;
	let x = player.offsetLeft;
	let y = player.offsetTop;

	switch (touch) {
		
		case 'Space':	
			alert("espace");
			break;
		
		case 'ArrowLeft':
			x-=50;		
			break;
		
		case 'ArrowDown':
			y+=50;
			break;
		
		case 'ArrowRight':
			x+=50;
			break;
		
		case 'ArrowUp':
			y-=50;
			break;
		
		default:

	}
if(x>=0 && x<500){
	player.style.left= String(x)+'px';
}

if(y>=0 && y<500){
	player.style.top= String(y)+'px';

}

});


//Création des ennemis

let nbEnemy=5;


for(let i=0; i<nbEnemy; i++){
	let x=Math.floor(Math.random()*10)*50;
	let y=Math.floor(Math.random()*10)*50;
	let enemy=document.createElement("div");
	enemy.classList.add("enemy");
	gameboard.appendChild(enemy);
	enemy.style.left= String(x)+'px';
	enemy.style.top= String(y)+'px'
}





	//Déplacement des ennemis

function updatePosition(){
	let enemys=gameboard.querySelectorAll(".enemy");

	for(let i=0; i<enemys.length; i++){
		let x = enemys[i].offsetLeft;
		let y = enemys[i].offsetTop;
		let position=Math.floor(Math.random()*4);

		switch (position) {

			case 0:
				x-=50;		
				break;
			
			case 1:
				y-=50;
				break;
			
			case 2:
				x+=50;
				break;
			
			case 3:
				y+=50;
				break;
			
			default:
	
		}
	if(x>=0 && x<500){
		enemys[i].style.left= String(x)+'px';
	}
	
	if(y>=0 && y<500){
		enemys[i].style.top= String(y)+'px';
	
	}		
	}

}


	let interval=setInterval(updatePosition,1000); 





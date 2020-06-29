

// Déplacement du joueur
const joueur = document.querySelector(".joueur");
const plateau = document.querySelector(".plateau_jeu");


window.addEventListener("keydown", function(event) {
	let touche=event.code;
	let x = joueur.offsetLeft;
	let y = joueur.offsetTop;

	switch (touche) {
		
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
if(x>="0" && x<"500"){
	joueur.style.left= String(x)+'px';
}

if(y>="0" && y<"500"){
	joueur.style.top= String(y)+'px';

}

});


//Création des ennemis

let ennemisx = [1,2,3,4,5,6,7,8,9,10];
let ennemisy = [1,2,3,4,5,6,7,8,9,10];

for(let i=0; i>ennemisx.length; i++){
	let min=0;
	let max=10;
	ennemisx[i]=Math.floor(Math.random()*(max-min))*50;
	
}


for(let i=0; i>ennemisy.length; i++){
	let min=0;
	let max=10;
	ennemisy[i]=Math.floor(Math.random()*(max-min))*50;
	
}


for(let i=0; i>ennemisx.length; i++){
	let ennemi=document.createElement("div");
	ennemi.classList.add(ennemi);
	plateau.appendChild(ennemi);
	let x=ennemisx[i];
	let y=ennemisy[i];
	ennemi.style.left= String(x)+'px';
	ennemi.style.top= String(y)+'px'
}
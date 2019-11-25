var inimigos = new Array();
var balas = new Array();
let texto = " ";
let minutos = "";
let segundos = "";
let tempoDeSessao = 0;
//let level = 1;
//let playerx = 320, playery = 240;
//let direction = 1;
//let directionFlag = true;
//let movXRandom = (Math.random() - 0.5);
//let i = 0;
//let xprojecao = Math.random()*800, yprojecao = 0;
  
  
function timer() {
	tempoDeSessao++;
	minutos = parseInt(tempoDeSessao / 60);
	minutos =  minutos < 10 ? "0" + minutos : minutos;
	segundos = (tempoDeSessao % 60) < 10 ? "0" + tempoDeSessao % 60 : tempoDeSessao % 60;
	texto = "Jogador: "+ jogador.getNome() + " " + "| Level: "+ jogador.getLevel() + " " + "| Tempo: " + minutos + ":" + segundos + " " + "| Pontuacao: " + jogador.getPontuacao()+ " " + "| Municao: " + jogador.getMunicao();
}

function novoJogo(){
	if(jogadorVenceu()){
		jogador.setLevel(1);
		jogador.setPontuacao(0);
		jogador.setVelocidadeMax(5);
		inimigos.forEach(removeTodosInimigos);
		jogador.setNome(window.prompt("Qual o seu nome?"));
	}
}

function jogadorVenceu(){
	if(jogador.getLevel()>20){
		window.alert("Voce venceu!");
		return true;
	}else{
		return false;
	}
}

//Passa o jogador para o proximo level
function passaDeLevel(){
	jogador.setLevel(jogador.getLevel()+1);
	jogador.setPontuacao(jogador.getPontuacao()+(1000*jogador.getLevel()));
	jogador.setVelocidadeMax(jogador.getVelocidadeMax()*1.1);
}

// Calcula colisao
function colisao(item, indice, inimigos){
	if(Math.sqrt(Math.pow((jogador.getX() - inimigos[indice].getX()), 2) + Math.pow((jogador.getY() - inimigos[indice].getY()), 2)) < 100 / 2 ){
		$("canvas").drawImage({
			source: 'sprites/explosao.png',
			x: inimigos[indice].getX(),
			y: inimigos[indice].getY(),
			width: 200,
			height: 200
		});
	}
}

//Inteiro randomico i, sendo min<= i <max
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

//classe bala
class bala{
	constructor(){
		this.source = 'sprites/bala.png';
		this.x = jogador.getX();
		this.y = jogador.getY()-50;
	}
	getSource(){
		return this.source;
	}
	setX(x){
		this.x = x;
	}
	getX(){
		return this.x;
	}
	setY(y){
		this.y = y;
	}
	getY(){
		return this.y;
	}
}

function atirar(){
	if(jogador.getMunicao()>0){
		jogador.setMunicao(jogador.getMunicao()-1);
		balas.push(new bala);
	}
}
//Classe player
class player{
	constructor(nome){
		this.nome = nome;
		this.x = 320;
		this.y = 240;
		this.level = 1;
		this.pontuacao = 0;
		this.velocidadeMax = 5;
		this.municao = 30;
	}
	setMunicao(municao){
		this.municao = municao;
	}
	getMunicao(){
		return this.municao;
	}
	setVelocidadeMax(velocidadeMax){
		this.velocidadeMax = velocidadeMax;
	}
	getVelocidadeMax(){
		return this.velocidadeMax;
	}
	getPontuacao(){
		return this.velocidadeMax;
	}
	getPontuacao(){
		return this.velocidadeMax;
	}
	setPontuacao(pontuacao){
		this.pontuacao = pontuacao;
	}
	getPontuacao(){
		return this.pontuacao;
	}
	setLevel(level){
		this.level = level;
	}
	getLevel(){
		return this.level;
	}
	setNome(nome){
		this.nome = nome;
	}
	getNome(){
		return this.nome;
	}
	setX(x){
		this.x = x;
	}
	getX(){
		return this.x;
	}
	setY(y){
		this.y = y;
	}
	getY(){
		return this.y;
	}
}

// Classe inimigo
class inimigo{
	constructor(){
		this.source = "sprites/naveInimiga"+jogador.getLevel()+".png";
		let opcao = getRandomInt(1,5);
		switch(opcao){
		case(1): // Nasce no leste
			this.x = 770;
			this.y = Math.random()*600;
			break;
		case(2): // Nasce no oeste
			this.x = 30;
			this.y = Math.random()*600;
			break;	
		case(3): // Nasce no norte
			this.x = Math.random()*800;
			this.y = 30;
			break;
		case(4): // Nasce no sul
			this.x = Math.random()*600;
			this.y = 570;
			break;
		}
		let opcao2 = Math.random();
		if(opcao2<0.2){
			this.velocidade = 0.5;
		}else{
			this.velocidade = opcao2;
		}
		this.direcao = getRandomInt(1,8);
		}
		getVelocidade(){
			return this.velocidade;
		}
		getDirecao(){
			return this.direcao;
		}
		getSource(){
			return this.source;
		}
		setX(x){
			this.x = x;
		}
		getX(){
			return this.x;
		}
		setY(y){
			this.y = y;
		}
		getY(){
			return this.y;
		}
	}

// Movimenta o inimigo de acordo com sua direcao
function andarBala(item, indice, balas){
	balas[indice].setY(balas[indice].getY()-2);
}

// Movimenta o inimigo de acordo com sua direcao
function andarInimigo(item, indice, inimigos){
		switch(inimigos[indice].getDirecao()){
		case(1): // Andar para leste
			inimigos[indice].setX(inimigos[indice].getX()-jogador.getVelocidadeMax()*inimigos[indice].getVelocidade());
			break;
		case(2): // Andar para oeste
			inimigos[indice].setX(inimigos[indice].getX()+jogador.getVelocidadeMax()*inimigos[indice].getVelocidade());
			break;
		case(3): // Andar para norte
			inimigos[indice].setY(inimigos[indice].getY()-jogador.getVelocidadeMax()*inimigos[indice].getVelocidade());
			break;
		case(4): // Andar para sul
			inimigos[indice].setY(inimigos[indice].getY()+jogador.getVelocidadeMax()*inimigos[indice].getVelocidade());
			break;
		case(5): // Andar para noroeste
			inimigos[indice].setX(inimigos[indice].getX()-jogador.getVelocidadeMax()*inimigos[indice].getVelocidade());
			inimigos[indice].setY(inimigos[indice].getY()-jogador.getVelocidadeMax()*inimigos[indice].getVelocidade());
			break;
		case(6): // Andar para nordeste
			inimigos[indice].setX(inimigos[indice].getX()+jogador.getVelocidadeMax()*inimigos[indice].getVelocidade());
			inimigos[indice].setY(inimigos[indice].getY()-jogador.getVelocidadeMax()*inimigos[indice].getVelocidade());
			break;
		case(7): // Andar para sudoeste
			inimigos[indice].setX(inimigos[indice].getX()-jogador.getVelocidadeMax()*inimigos[indice].getVelocidade());
			inimigos[indice].setY(inimigos[indice].getY()+jogador.getVelocidadeMax()*inimigos[indice].getVelocidade());
			break;
		case(8):  // Andar para sudeste
			inimigos[indice].setX(inimigos[indice].getX()+jogador.getVelocidadeMax()*inimigos[indice].getVelocidade());
			inimigos[indice].setY(inimigos[indice].getY()+jogador.getVelocidadeMax()*inimigos[indice].getVelocidade());
			break;
		default:
		 	inimigos[indice].setX(inimigos[indice].getX()-jogador.getVelocidadeMax()*inimigos[indice].getVelocidade());
		 	break;
	}
}

// Fazem os inimigos que estao no vetor de inimigos andarem
function inimigosAndam(){
	inimigos.forEach(andarInimigo);
}

// Fazem os inimigos que estao no vetor de inimigos andarem
function balasAndam(){
	balas.forEach(andarBala);
}

// Desenha bala
function desenhaBala(item, indice, balas){
		$("canvas").drawImage({
		source: 'sprites/bala.png',
		x: balas[indice].getX(),
		y: balas[indice].getY(),
		width: 30,
		height: 30
	});
}

// Renderiza as balas que estao no vetor de balas
function renderizaBalas(){
	balas.forEach(desenhaBala);
	balasAndam();
}

// Desenha o inimigo
function desenhaInimigo(item, indice, inimigos){
		$("canvas").drawImage({
		source: inimigos[indice].getSource(),
		x: inimigos[indice].getX(),
		y: inimigos[indice].getY(),
		width: 80,
		height: 80
	});
}

// Renderiza os inimigos que estao no vetor de inimigos
function renderizaInimigos(){
	inimigos.forEach(desenhaInimigo);
	inimigosAndam();
}

// Verifica se o jogador colidiu com algum inimigo
function jogadorColidiu(){
	inimigos.forEach(colisao);
}

// Cria inimigos
function criarInimigos(){
	if(jogador.getLevel()<3){
		for(var qt = 1; qt <= jogador.getLevel(); qt++) {
			inimigos.push(new inimigo);
		}
	}else{
		inimigos.push(new inimigo);
		inimigos.push(new inimigo);
		inimigos.push(new inimigo);
		inimigos.push(new inimigo);
	}	
}

// Remove todos os inimigos do vetor de inimigos
function removeTodosInimigos(item, indice, inimigos){
	inimigos.splice(indice, 1);
}

// Remove o inimigo que saiu da tela do vetor de inimigos
function removeInimigo(item, indice, inimigos){
	if(inimigos[indice].getX<0 || inimigos[indice].getX>800 || inimigos[indice].getY<0 || inimigos[indice].getY<600){
		inimigos.splice(indice, 1);
	}
}

// Remove o inimigo que saiu da tela do vetor de inimigos
function removeBala(item, indice, balas){
	if(balas[indice].getY<0){
		balas.splice(indice, 1);
	}
}

// Verifica quais balas sairam da tela
function removerBalas(){
	inimigos.forEach(removeBala);
}

// Verifica quais inimigos sairam da tela
function removerInimigos(){
	inimigos.forEach(removeInimigo);
}

// Renderiza todo canvas
function renderScene() {

	// Limpa tela
	$("canvas").clearCanvas(); 

	$("canvas").drawRect({
		fillStyle: "#000",
		x: 400,
		y: 300,
		width: 800,
		height: 600
	});

	// Desenha o plano de fundo
	$("canvas").drawImage({
		source: 'paginaBG2.jpg',
		x: 400,
		y: 300,
		width: $("canvas").width(),
		height: $("canvas").height()
	});

	// Desenha o personagem principal
	$("canvas").drawImage({
		source: 'sprites/naveMC.png',
		x: jogador.getX(),
		y: jogador.getY(),
		width: 80,
		height: 80
	});

	// Chama função que renderiza os inimigos
	jogadorColidiu();
	renderizaInimigos();
	renderizaBalas();
	novoJogo();
	//enemyWave();


	// Renderiza a contagem de tempo
	$("canvas").drawText({
		fillStyle: "#FFF",
		x: ($("canvas").width()/2), 
		y: 20,
		fontSize: 20,
		fontFamily: 'Arial',
		text: texto
	});
}

$(document).ready(function() {
	$("canvas").css("cursor", "none");
	$("canvas").on("mousemove", function(event) {
		jogador.setX(event.pageX - ($("body").width() - $("canvas").width())/2);
		jogador.setY(event.pageY);
	});
	$("canvas").on("click", function(event) {
		atirar();
	});
	jogador = new player(window.prompt("Qual o seu nome?"));
//	setInterval(gameLoop, 15);
	setInterval(passaDeLevel, 30000);
	setInterval(criarInimigos, 150);
	setInterval(renderScene, 15);
	setInterval(timer, 1000);
//	setInterval(resetEnemies, 2000);
	
});

//function gameLoop(){
	//updateGame();
//	renderScene();
//}

// Atuliza os atributos
//function updateGame(){
//	switch(level){
//		case(1):
//			naveInimiga = {
//				source: "sprites/naveInimiga"+level+".png",
//				x: xprojecao,
//				y: yprojecao,
//				width: 80,
//				height: 80
//			}
//			xprojecao += 1.8*direction;
//			yprojecao += 1.8;
//			break;
//		case(2):
//			naveInimiga = {
//				source: "sprites/naveInimiga"+level+".png",
//				x: xprojecao,
//				y: yprojecao,
//				width: 80,
//				height: 80
//			}
//			xprojecao += 2.4*direction;
//			yprojecao += 2.4;
//			break;
//		case(3):
//			naveInimiga = {
//				source: "sprites/naveInimiga"+level+".png",
//				x: xprojecao,
//				y: yprojecao,
//				width: 80,
//				height: 80
//			}
//			xprojecao += 3*direction;
//			yprojecao += 3;
//			break;
//		case(4):
//			naveInimiga = {
//				source: "sprites/naveInimiga"+level+".png",
//				x: 400,
//				y: 100,
//				width: 360,
//				height: 360
//			}
//			xprojecao += movXRandom * 3.5;
//	}
//}

//let naveInimiga = {
//	source: "sprites/naveInimiga"+level+".png",
//	x: 0,
//	y: 0,
//	width: 80,
//	height: 80
//}

// Reseta naves inimigas
//function resetEnemies(){
//	xprojecao = Math.random()*800;
//	yprojecao = 0;
//	directionFlag = true;
//}

// Renderiza as naves inimigas
//function enemyWave(){
//	waveSize = 5
//	if(level === 4){
//		$("canvas").drawImage(naveInimiga);
//			naveInimiga.x -= 40;
//	}
//	else{
//		for(i = 0; i < waveSize; i++){
//			naveInimiga.x -= 50*direction;
//			naveInimiga.y -= 50;
//			$("canvas").drawImage(naveInimiga);
//		}
//	}
//}

//function enemyDirection(x,y){
//	if((x > 400) && (y < 10)){
//		return -1;
//	}else{
//		return 1;
//	}
//}
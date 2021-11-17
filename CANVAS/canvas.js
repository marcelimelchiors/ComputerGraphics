var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');


//desenho os círculos com a cor definida pelo tamanho do raio.
//impede que as bolas saiam da tela e que o raio seja negativo.
//faz com que as bolas se movam nas direções x e y, e o raio aumente ou diminua.

function Circle(x, y, dx, dy, r, dr) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.r = r;
	this.dr = dr;

	this.draw = function(color) {
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
			ctx.strokeStyle = color;
			ctx.stroke();
		}

	this.update = function(){
		if (this.x + this.r > 800 || this.x - this.r < 0) {
			this.dx = -this.dx;
		}
		if (this.y + this.r > 600 || this.y - this.r < 0) {
			this.dy = -this.dy;
		}
		if (this.r > 80 || this.r < 3){
			this.dr = -this.dr;
		}
		this.x += this.dx;
		this.y += this.dy;
		this.r += this.dr;
	}

}

//seleciona aleatoriamente as coordenadas de que parte cada círculo
//seleciona aleatoriamente a velocidade e a direção
//seleciona o tamanho do raio e a velocidade com q cresce
var quantidade_circulos = 15;
var circleArray = [];

for (var i = 0; i < quantidade_circulos; i++){
	var r = Math.random() * 40;
	var x = Math.random() * (800 - r * 2) + r;
	var y = Math.random() * (600 - r * 2) + r;
	var dx = (Math.random() - 0.5) * 4;
	var dy = (Math.random() - 0.5) * 4;
	var dr = (Math.random() - 0.5) * 0.5; //
	circleArray.push(new Circle(x, y, dx, dy, r, dr));
}

//
//
//
function animate() {
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, 800, 600);

	for (const circle of circleArray) {
		circle.update();
	}

	const maiorRaio = Math.max(...circleArray.map(circle => circle.r));
	const menorRaio = Math.min(...circleArray.map(circle => circle.r));

	for (const circle of circleArray) {
		if (circle.r == maiorRaio) {
			circle.draw('#000080');
		}
		if (circle.r == menorRaio) {
			circle.draw('#FFD700');
		}
		if (circle.r != maiorRaio && circle.r != menorRaio) {
			circle.draw('#DC143C');
		}
	}
}

animate()

var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var c = canvas.getContext("2d");

var circleArray = [];
var colorArray = [
    '#2c3e50',
    '#e74c3c',
    '#ecf0f1',
    '#3498db',
    '#2980b9'
];

var mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', function(e) {
    mouse.x = e.x;
    mouse.y = e.y;
});

window.addEventListener('resize', function() {
    init();
})






function Circle(x, y, radius, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = radius;
    this.minR = radius;
    this.maxR = 40;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function() {
        if(this.x + this.r > innerWidth || this.x - this.r < 0) {
            this.dx = -this.dx;
        }
    
        if(this.y + this.r > innerHeight || this.y - this.r < 0 ) {
            this.dy = -this.dy;
        }

        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if(this.r < this.maxR) {
                this.r += 1;
            }
        } else if(this.r > this.minR ) {
            this.r -= 1;
        }
    
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

function init() {
    circleArray = [];
    for(var i = 0; i < 40; i++) {

    var x = Math.random() * (300 - r * 2) + r;
    var y = Math.random() * (300 - r * 2) + r;
    var dx = (Math.random() - 0.5) * 8;
    var dy = (Math.random() - 0.5) * 8;
    var r = Math.random() * 10 + 1;
    
    circleArray.push(new Circle(x, y, r, dx, dy));


}

}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for(var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
    

    
}


init();
animate();
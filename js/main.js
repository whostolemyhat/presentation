
$(document).ready(function() {
    init();

    circleDemo();

    $('.play').click(function(e) {
        e.preventDefault();
        demoBasicMovement();
    });

    $('.play2').click(function(e) {
        e.preventDefault();
        demoBasicMovement2();
    });

    $('.play3').click(function(e) {
        e.preventDefault();
        demoBasicMovement3();
    });
    
    $('.play-text').click(function(e) {
        e.preventDefault();
        demoText();
    });
    
    $('.play-text2').click(function(e) {
        e.preventDefault();
        demoText2();
    });

});

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame     ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();


function init() {
    var canvas;
    var context;
    var time;

    canvas = $('#canvas');
    context = canvas[0].getContext('2d');

    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;

    // draw(context);
    var mousePos = {x: canvas.width / 2, y: canvas.height / 2 };
    var colour = '#7d48e0';
    var particleSystem = new ParticleSystem(context);
    
    canvas.click(function(e) {
        mousePos = Utility.getMouseClick(canvas[0], e);
        particleSystem.createExplosion(mousePos.x, mousePos.y, colour);
    });

    (function animloop(){
        requestAnimFrame(animloop);
        var now = new Date().getTime();
        var dt = now - (time || now);
        time = now;
        particleSystem.update(dt);
    })();
}


// horrible code for presentation
function circleDemo() {
    demoDrawCircle('circle');
    demoDrawCircle('circle-stretch');
    demoDrawCircle('circle-demo');

    demoDrawLots();
    demoParticles();
}

function demoDrawCircle(selector) {
    var canvas = document.getElementById(selector);
    var ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 20, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fillStyle = '#ff3';
    ctx.fill();
}

function drawCircle(ctx, x, y, radius, colour) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fillStyle = colour;
    ctx.fill();
}


function demoDrawLots() {
    var canvas = document.getElementsByClassName('circle-demo-lots');
    
    for(var i = 0; i < canvas.length; i++) {
        var ctx = canvas[i].getContext('2d');
        drawCircle(ctx, 150, 75, 20, '#ff3');
        drawCircle(ctx, 10, 95, 10, '#f33');
        drawCircle(ctx, 80, 20, 25, '#3f3');
        drawCircle(ctx, 220, 35, 30, '#3ff');
    }
}

var colours = [
    '#fef',
    '#fee',
    '#36f8d3',
    '#0691f0',
    '#eec824',
    '#fc02fb',
    '#1ee315',
    '#9a4ff3',
    '#d56040'
];

function demoParticle() {
    this.x = Math.floor(Math.random() * 800);
    this.y = Math.floor(Math.random() * 600);
    this.radius = (Math.random() * 35) + 5;
    this.colour = colours[Math.floor(Math.random() * colours.length)];
}

function drawParticleCircle(ctx, particle) {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fillStyle = particle.colour;
    ctx.fill();
}

function demoParticles() {
    var canvas = document.getElementById('circle-demo-particles');
    var ctx = canvas.getContext('2d');
    var particles = [];

    for(var i = 0; i < 10; i++) {
        // drawParticleCircle(ctx, new demoParticle());
        particles.push(new demoParticle());
    }

    for(var j = 0; j < particles.length; j++) {
        drawParticleCircle(ctx, particles[j]);
    }
}

function demoBasicMovement() {
    var canvas = document.getElementById('circle-demo-movement');
    var ctx = canvas.getContext('2d');
    var particles = [];

    for(var i = 0; i < 10; i++) {
        // drawParticleCircle(ctx, new demoParticle());
        particles.push(new demoParticle());
    }

    (function animloop(){
        requestAnimFrame(animloop);
        for(var i = 0; i < particles.length; i++) {
            updateBasicMovement(particles[i]);
            drawParticleCircle(ctx, particles[i]);
        }
    })();
}

function demoBasicMovement2() {
    var canvas = document.getElementById('circle-demo-movement2');
    var ctx = canvas.getContext('2d');
    var particles = [];

    for(var i = 0; i < 10; i++) {
        // drawParticleCircle(ctx, new demoParticle());
        particles.push(new demoParticle());
    }

    (function animloop(){
        requestAnimFrame(animloop);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        for(var i = 0; i < particles.length; i++) {
            updateBasicMovement(particles[i]);
            drawParticleCircle(ctx, particles[i]);
        }
    })();
}

function updateBasicMovement(particle) {
    particle.x += Math.floor(Math.random() * 20) - 10;
    particle.y += Math.floor(Math.random() * 20) - 10;
}


function demoBasicMovement3() {
    var canvas = document.getElementById('circle-demo-movement3');
    var ctx = canvas.getContext('2d');
    var particles = [];
    var x = ctx.canvas.width / 2;
    var y = ctx.canvas.height / 2;

    for(var i = 0; i < 10; i++) {
        particles.push(new demoStaticParticle(x, y));
    }

    (function animloop(){
        requestAnimFrame(animloop);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        for(var i = 0; i < particles.length; i++) {
            updateCleverMovement(particles[i]);
            drawParticleCircle(ctx, particles[i]);
        }
    })();
}

function demoStaticParticle(x, y) {
    this.x = x;
    this.y = y;
    this.radius = (Math.random() * 35) + 5;
    this.colour = colours[Math.floor(Math.random() * colours.length)];
    this.velocityX = Math.floor(Math.random() * 20) - 10;
    this.velocityY = Math.floor(Math.random() * 20) - 10;
}

function updateCleverMovement(particle) {
    particle.x += particle.velocityX;
    particle.y += particle.velocityY;
}

// TEXT

function pickLetter() {
    // 33 - 126
    return String.fromCharCode(randomRange(33, 126));
}

// http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function demoTextParticle(x, y) {
    this.x = x;
    this.y = y;
    this.colour = colours[Math.floor(Math.random() * colours.length)];
    this.velocityX = Math.floor(Math.random() * 10) - 5;
    this.velocityY = Math.floor(Math.random() * 10) - 5;
    this.letter = pickLetter();
}

function drawTextParticle(context, particle) {
    context.fillStyle = particle.colour;
    context.font = 'bold 34px arial';
    context.fillText(particle.letter, particle.x, particle.y);
}

function demoText() {
    var canvas = document.getElementById('text-demo');
    var ctx = canvas.getContext('2d');
    var particles = [];
    var x = ctx.canvas.width / 2;
    var y = ctx.canvas.height / 2;

    for(var i = 0; i < 10; i++) {
        particles.push(new demoTextParticle(x, y));
    }

    (function animloop(){
        requestAnimFrame(animloop);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        for(var i = 0; i < particles.length; i++) {
            updateCleverMovement(particles[i]);
            drawTextParticle(ctx, particles[i]);
        }
    })();
}

function demoText2() {
    var canvas = document.getElementById('text-demo2');
    var ctx = canvas.getContext('2d');
    var particles = [];
    var x = ctx.canvas.width / 2;
    var y = ctx.canvas.height / 2;

    for(var i = 0; i < 10; i++) {
        particles.push(new demoTextParticle(x, y));
    }

    (function animloop(){
        requestAnimFrame(animloop);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        for(var i = 0; i < particles.length; i++) {
            particles[i].letter = pickLetter();
            updateCleverMovement(particles[i]);
            drawTextParticle(ctx, particles[i]);
        }
    })();
}


// this class describes the properties of a single particle.
class Particle {
// setting the co-ordinates, radius and the
// speed of a particle in both the co-ordinates axes.
  constructor(){
    this.x = random(0,width);
    this.y = random(0,height);
    this.r = random(5,18);
    this.xSpeed = random(-4,4);
    this.ySpeed = random(-3,4);
  }

// creation of a particle.
  createParticle() {
    noStroke();
    fill('rgba(200,169,169,0.5)');
    circle(this.x,this.y,this.r);
  }

// setting the particle in motion.
  moveParticle() {
    if(this.x < 0 || this.x > width)
      this.xSpeed*=-1;
    if(this.y < 0 || this.y > height)
      this.ySpeed*=-1;
    this.x+=this.xSpeed;
    this.y+=this.ySpeed;
  }

// this function creates the connections(lines)
// between particles which are less than a certain distance apart
  joinParticles(particles) {
    particles.forEach(element =>{
      let dis = dist(this.x,this.y,element.x,element.y);
      if(dis<150) {
        stroke('rgba(255,255,255,0.08)');
        line(this.x,this.y,element.x,element.y);
      }
    });
  }
}

function heart(x, y, size) {
  beginShape();
  vertex(x, y);
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  endShape(CLOSE);
}

//Textures For Torus Cylinder Box
let img;
let img1;
let img2;

//Sound
let playMode = 'sustain';
let sample;

function mouseClicked() {
  sample.play();
}
function keyPressed(k) {
  togglePlayMode();
}

function togglePlayMode() {
  if (playMode === 'sustain') {
    playMode = 'restart';
  } else {
    playMode = 'sustain';
  }
  sample.playMode(playMode);
}

// thick heart
let thicka=0;
let thickangle=0;
let locX;
let locY;
let thickheart=[];

//Hearts Variable
s = 200;

// Particles Array
let particles = [];

function preload() {
	img = loadImage('lava.jpg');
	img2 = loadImage('lava.jpg');
	img3 = loadImage('lava.jpg');
	
	//Singnature
	signature = loadImage('B4ckBOne.jpg');
	
	//Sound
	soundFormats('mp3', 'ogg');
	sample = loadSound('MB24_Cables_Pool_01.mp3');
}

function setup() {
 // put setup code here
	setTimeout(function(){
		window.location.reload(1);
	}, 1000000);
	frameRate(30);
	img = loadImage('lava.jpg');
	img2 = loadImage('lava.jpg');
	createCanvas(1920, 1080, WEBGL);
	
	//Particle Stuff
	for(let i = 0;i<width/10;i++){
		particles.push(new Particle());
	}
	
	// Scene 3
	x1 = width / 2;
	y1 = height;
	
	describe('Test WEBGL with random STUFF!');
}



function draw() {
  // put drawing code here
	background(0);
	
	//Sound
	let str = 'Click here to play! Press key to toggle play mode.';
	str += ' Current Play Mode: ' + playMode + '.';
	text(str, 10, height / 2);

		// Frame 0 - Torus Lava
	if (frameCount <= 100) {
		
		//signature
		push();
		noStroke();
		translate(199,100,600);
		texture(signature);
		plane();
		pop();
		
		push();
		translate(0,0,190);
		texture(img);
		box(100);
		pop();
		push();
		translate(0,0,190);
		rotateX(frameCount * 0.01);
		rotateY(frameCount * 0.01);
		texture(img);
		torus(120, 50);
		rotateX(frameCount * -0.05);
		texture(img2);
		cylinder(50,450);
		pop();
	}
	
	

	// Frame 1 Hearts Static Colorchange
	if ( frameCount > 100 && frameCount <= 250 ) {
		push();
		colorMode(HSB);
		translate(width*-1/2,height*-1/2,0);
		for (x = -20; x < width-100; x += s-3) {
			for (y = -70; y < height-100; y += s-45) {
				fill(((x*1/width)*360+frameCount*6)%360, 255, 255);
				heart(x+s/2, y+s/2, s/2);
			}
		}
		pop();
	}
	
	// Frame 2 Particles
	if (frameCount > 250 && frameCount <= 400 ){
		push();
		translate(width*-1/2,height*-1/2,0);
		translate
		for(let i = 0;i<particles.length;i++) {
		particles[i].createParticle();
		particles[i].moveParticle();
		particles[i].joinParticles(particles.slice(i));
		}		
		pop();
	}
	
	// Frame 3 Poppin Hearts
	if (frameCount > 400 && frameCount <= 1000 ) {
		push();
		colorMode(HSB);
			translate(width*-1/2,height*-1/2,0);
			for (x = -20; x < width-100; x += s-3) {
				for (y = -70; y < height-100; y += s-45) {
					fill(((x*1/width)*360+frameCount*6)%360, 255, 255);
					heart(x+s/2, y+s/2, s/2+(frameCount-90)%10);
				}
			}
		pop();
		push();
		colorMode(HSB);
		if (frameCount > 500 && frameCount <= 1000 ) {
			translate(-240-random(-130,30),height*-1/2,0);
			colorMode(HSB);
			fill(((x*1/height)*360+random(0,360))%360, 255, 255);
			heart(0, y1+s/2, s*2-(frameCount*1/frameCount+200)+random(-30,30)%30*2);
			// Jiggling randomly on the horizontal axis
			x1 = x1 + random(-60, 60);
			// Moving up at a constant speed
			y1 = y1 - 2 + random(-30, 30);
			// Reset to the bottom
			if (y1 < 0) {
				y1 = height-500;
			}
		}
		pop();
		push();
		colorMode(HSB);
			if (frameCount > 500 && frameCount <= 1000 ) {
			colorMode(HSB);
			//translate(width*-1/2,height*-1/2,0);
			translate(+240+random(-30,130),height*-1/2,0);
			colorMode(HSB);
			fill(((x*1/height)*360+random(0,360))%360, 255, 255);
			heart(0, y1+s/2, s*2-(frameCount*1/frameCount+200)+random(-30,30)%30*2);
			// Jiggling randomly on the horizontal axis
			x1 = x1 + random(-60, 60);
			// Moving up at a constant speed
			y1 = y1 - 2 + random(-30, 30);
			// Reset to the bottom
			if (y1 < 0) {
				y1 = height-500;
			}
		}
		pop();
	}
	
	//~ // Frame 4
	if (frameCount > 1000 && frameCount <= 30000 ) {
			  // heart
			push();
			translate(0,0,0);
			rotateY(thickangle);
			strokeWeight(100); //Diameter heart
			stroke('#ff0000');
			noFill();
			beginShape();
			for( i = 0 ; i < thickheart.length; i+=1 ) {
			  vertex(thickheart[i].x,thickheart[i].y);
			}
			endShape();
			  var r= 15;
			  var x= r*16*pow(sin(thicka),3);
			  var y= -r*(13*cos(thicka)-5*cos(2*thicka)-2*cos(3*thicka)-cos(4*thicka));
			append(thickheart,createVector(x,y));
			  
			thicka+=0.05;
			while( thicka > TWO_PI ) {
			  thicka = TWO_PI
			}
			pop();
			thickangle+=0.1;		
			
			//Signature
			push();
			noStroke();
			translate(199,100,600);
			texture(signature);
			plane();
			pop();
	}
	
}

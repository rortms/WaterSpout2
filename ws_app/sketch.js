// Declare objects
var flyers = []; 
var orbs = [];

colors = { red : "#F44336",
	   pink: "#E91E63",
	   purple: "#9C27B0",
	   deep_purple: "#673AB7",
	   indigo: "#3F51B5",
	   blue: "#2196F3",
	   light_blue: "#03A9F4",
	   cyan: "#1DE9B6",
	   green: "#76FF03",
	   lime: "#C6FF00",
	   yellow: "#FFEB3B",
	   amber: "#FFC107",
	   burnt_orange: "#FF9800",
	   orange: "#FF5722",
	   black: "#000000",
	   white: "#FFFFFF",
	   grey: "#607D8B",
	 };

// Load Percussion 
function preload() {
    
    beat1 = loadSound('assets/beat1.wav');
    beat2 = loadSound('assets/beat2.wav');
    clap = loadSound('assets/clap.wav');
    crash1 = loadSound('assets/crash1.wav');
    crash2 = loadSound('assets/crash2.wav');
    hh1 = loadSound('assets/hh1.wav');
    hh2 = loadSound('assets/hh2.wav');
    kick = loadSound('assets/kick.wav');
    snare1 = loadSound('assets/snare1.wav');
    snare2 = loadSound('assets/snare2.wav');

}

c_kys = Object.keys(colors);
console.log(colors.yellow);

function setup() {
    createCanvas(800, 640);
    
    flyers.push(new Flyer(colors.green));
    flyers.push(new Flyer(colors[c_kys[randInt(0,17)]]));
    flyers.push(new Flyer(colors[c_kys[randInt(0,17)]]));
    
    //orbs.push(new Orb(20, colors.red, 0.7));    
    orbs.push(new Orb(20, colors.burnt_orange, 0.5));
    orbs.push(new Orb(20, colors.light_blue, 0.35));
    orbs.push(new Orb(20, colors.lime, 0.22));
    //orbs.push(new Orb(20, colors.green, 0.1));

    // Test loud sound
    beat1.setVolume(0.3);
    beat1.play();
}

function draw() {
    //console.log(millis());
    background(colors.black);
    // Draw orbs
    for (let orb of orbs) {    
	orb.displayOrb();
    }
    // Draw flyers
    for (let flyer of flyers) {
	flyer.move();
	flyer.displayFlyer();
    }
}


function mouseDragged() {
    // Make flyers track touch
    for (let flyer of flyers) {
	flyer.trackTouch();
    }
    
    // Have orbs be dragged
    for (let orb of orbs) {
	orb.drag();
    }
}

function mouseClicked() {
    // (double) click to hook orb
    for (let orb of orbs) {
	if (orb.isHooked()) {
	    orb.hooked = true;
	    orb.drag_start = createVector(mouseX,mouseY);
	}

	// Activate drop
	orb.activateDrop();
    }
}

function mouseReleased() {
    for (let orb of orbs) {    
	orb.hooked = false;
	orb.setCenter(width/2, height/2);
	orb.resetOrb();
    }
}

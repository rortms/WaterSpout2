////////////////////////////////////
//          Main Sketch
////////////////////////////////////


// Color pallette
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
	   grey: "#607D8B",	   
	   orange: "#FF5722",
	   black: "#000000",
	   white: "#FFFFFF",
	 };


// Percussion file names
drum_sounds = {
    
    beat1 : 'assets/beat1.wav',
    snare2 : 'assets/snare2.wav',
    clap : 'assets/clap.wav',
    
    beat2 : 'assets/beat2.wav',
    crash1 : 'assets/crash1.wav',
    crash2 : 'assets/crash2.wav',
    hh1 : 'assets/hh1.wav',
    hh2 : 'assets/hh2.wav',
    kick : 'assets/kick.wav',
    snare1 : 'assets/snare1.wav',


};

// Convenience key arrays
color_kys = Object.keys(colors);
drum_kys = Object.keys(drum_sounds);

// Layout
var base_tile = 64;
var large = 10;
var small = 3;
var buffer = base_tile;
var canvas_width = large*base_tile + 2*buffer + 2 * small*base_tile;
var canvas_height = small*base_tile * Math.ceil(drum_kys.length/2);
var main_height = main_width = large*base_tile;

// Declare objects
var flyers = []; 
var orbs = [];
var orb_centers = [];


// Main sector centers
for (var i=0; i<3; i++)
    orb_centers.push({'x': main_width/2, 'y' : main_height/2});

// Drum array centers left column		     
for (var i = 0; i <= Math.ceil(drum_kys.length/2); i++) {

    orb_centers.push({ 'x' : main_width + small*base_tile/2,
		       'y' : small*base_tile/2  + i * small*base_tile});
}
// Drum array centers right column
for (var i = 0; i <= Math.ceil(drum_kys.length/2); i++) {
			 
    orb_centers.push({ 'x' : main_width + +2*buffer +small*base_tile/2 + base_tile,
		       'y' : small*base_tile/2  + i * small*base_tile});
}

// Time control
var fps = 60;       // Frames per second
var beat_time = 6;  // beat every n frames

//////////////////////////////////
// Initialize sketch 
function setup() {
    
    createCanvas(canvas_width, canvas_height);
    frameRate(fps);
    
    flyers.push(new Flyer(colors.green, main_width));
    flyers.push(new Flyer(colors[color_kys[randInt(0,17)]], main_width));
    flyers.push(new Flyer(colors[color_kys[randInt(0,17)]], main_width));
    
    // Main sector Orb Setup
    var num_drops = 24;
    var main_x = main_width/2;
    var main_y = main_height/2;
    orbs.push(new Orb(drum_sounds['beat1'],  num_drops, main_x, main_y, large*base_tile, 0.5, colors.burnt_orange));
    orbs.push(new Orb(drum_sounds['snare2'], num_drops/4*3, main_x, main_y, large*base_tile, 0.35, colors.light_blue));
    orbs.push(new Orb(drum_sounds['clap'],   num_drops/2, main_x, main_y, large*base_tile, 0.22, colors.lime));

    // Drum options columns setup
    for (var i=3; i<drum_kys.length; i++){
    	orbs.push(new Orb(drum_sounds[drum_kys[i]],
    			  num_drops,
    			  orb_centers[i].x, orb_centers[i].y,
    			  small*base_tile,
    			  0.5,
    			  colors[color_kys[randInt(0,15)]]));
    }

};

//////////////////////////////////
// Animate sketch
function draw() {
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

    // Highlight when hovering over drum option tile
    for (var i=3; i<orb_centers.length; i++) {
	var tile = orb_centers[i];
	if (abs(mouseX-tile.x) <= base_tile*0.8 && abs(mouseY-tile.y) <=base_tile*0.8){
	    noFill();
	    stroke(colors.white);
	    strokeWeight(4);
	    rect(tile.x - small*base_tile/2,
		 tile.y - small*base_tile/2,
		 small*base_tile,
		 small*base_tile,
		 base_tile/2);
	}
    }

};

// function swapOrbs() {
    
// };


//////////////////////////////////
// Handle User Interactions
function mouseDragged() {
    // Make flyers track touch
    for (let flyer of flyers) {
	flyer.trackTouch();
    }
    
    // Have orbs be dragged
    for (let orb of orbs) {
	orb.drag();
    }
};

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
};

function mouseReleased() {
    for (let orb of orbs) {
	orb.hooked = false;
	orb.resetOrb();	
    }
};

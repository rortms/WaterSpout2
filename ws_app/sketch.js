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
	   orange: "#FF5722",
	   black: "#000000",
	   white: "#FFFFFF",
	   grey: "#607D8B",
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

// Declare objects
var flyers = []; 
var orbs = [];

// Time control
var fps = 60;       // Frames per second
var beat_time = 3;  // beat every n frames

// Layout
var base_tile = 64;
var large = 10;
var small = 3;
var buffer = base_tile;
var canvas_width = large*base_tile + 2*buffer + 2 * small*base_tile;
var canvas_height = small*base_tile * Math.ceil(drum_kys.length/2);
var main_height = main_width = large*base_tile;

var drum_options = { 'left_column' : [], 'right_column' : [] };

for (var i = 0; i <= Math.ceil(drum_kys.length/2); i++) {

    drum_options['left_column'][i]  = { 'x' : main_width + small*base_tile/2,
					'y' : small*base_tile/2  + i * small*base_tile,
					'empty' : true };
    
    drum_options['right_column'][i] = { 'x' : main_width + +2*buffer +small*base_tile/2 + base_tile,
					'y' : small*base_tile/2  + i * small*base_tile,
					'empty' : true };
}


//////////////////////////////////
// Initialize sketch 
function setup() {
    
    createCanvas(canvas_width, canvas_height);
    frameRate(fps);
    
    flyers.push(new Flyer(colors.green, main_width));
    flyers.push(new Flyer(colors[color_kys[randInt(0,17)]], main_width));
    flyers.push(new Flyer(colors[color_kys[randInt(0,17)]], main_width));
    
    // Main sector Orbs
    var main_x = main_width/2;
    var main_y = main_height/2;
    orbs.push(new Orb(drum_sounds['beat1'],  24, main_x, main_y, large*base_tile, 0.5, colors.burnt_orange));
    orbs.push(new Orb(drum_sounds['snare2'], 24, main_x, main_y, large*base_tile, 0.35, colors.light_blue));
    orbs.push(new Orb(drum_sounds['clap'],   24, main_x, main_y, large*base_tile, 0.22, colors.lime));

    // Push orb options left column
    for (let tile of drum_options['left_column']) {
    	orbs.push(new Orb(drum_sounds['beat1'],
			  24,
    			  tile.x, tile.y,
			  small*base_tile,
			  0.5,
    			  colors[color_kys[randInt(0,17)]]));
    }

    // Push options right column
    for (let tile of drum_options['right_column']) {
    	orbs.push(new Orb(drum_sounds['beat1'],
			  24,
    			  tile.x, tile.y,
			  small*base_tile,
			  0.5,
    			  colors[color_kys[randInt(0,17)]]));
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

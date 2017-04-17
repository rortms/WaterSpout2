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
var small = 4;
var buffer = base_tile*5/4;
var canvas_width = large*base_tile + buffer + 2 * small*base_tile;
var canvas_height = small*base_tile * Math.ceil(drum_kys.length/2);
var main_height = main_width = large*base_tile;

// Declare objects
var flyers = []; 
var orbs = [];
var orb_centers = [];


// Main sector centers
for (var i=0; i<3; i++)
    orb_centers.push({'x': main_width/2, 'y' : main_height/2});


for (var i = 0; i <= Math.ceil(drum_kys.length/2); i++) {
    
// Drum array centers left column		     
    orb_centers.push({ 'x' : main_width + buffer + small*base_tile/2,
		       'y' : small*base_tile/2  + i * small*base_tile});
    
// Drum array centers right column
    orb_centers.push({ 'x' : main_width + 3*buffer +small*base_tile/2 + base_tile,
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
    var main_pos = createVector(main_width/2, main_height/2);
    orbs.push(new Orb(drum_sounds['beat1'],  num_drops, main_pos, large*base_tile, 0.6, colors.burnt_orange));
    orbs.push(new Orb(drum_sounds['snare2'], num_drops/4*3, main_pos, large*base_tile, 0.4, colors.light_blue));
    orbs.push(new Orb(drum_sounds['clap'],   num_drops/2, main_pos, large*base_tile, 0.22, colors.lime));

    // Drum options columns setup
    for (var i=3; i<drum_kys.length; i++){
    	orbs.push(new Orb(drum_sounds[drum_kys[i]],
    			  num_drops,
    			  createVector(orb_centers[i].x, orb_centers[i].y),
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
    // Swapping logic
    for (var i=0; i < orbs.length; i++)
	for(var j=0; j < orbs.length; j++){
	    var orb2swap2 = orb_centers[j]
	    
	    if ( i != j  && orbs[i].hooked &&
		 mouseX > large*base_tile && // Swap only with tile columns
		 abs(mouseX - orb2swap2.x) < base_tile*0.8 &&
		 abs(mouseY - orb2swap2.y) < base_tile*0.8 ){
		

		swapOrbs(i,j);
		console.log("SwapEm");

		console.log("Ready for next swap\n\n");
	    }
	}
    
    // Always reset positions after dragg release
    for (let orb of orbs) {
	orb.hooked = false;
	orb.resetOrb();
    }
};

/// Support Functions

// Swap orbs
function swapOrbs(i,j) {
    
    if (j < 3) // Cannot swap TO main sector 
	return
    
    // If orbs to swap are compatible 
    if ( orbs[i].num_drops == orbs[j].num_drops) {
	
	//If dragging Orb from main sector swap dimensions
	if  (i == 0) {
	    var orb_i_sector_size = orbs[i].ss;
	    var orb_i_scale = orbs[i].scale;
	    orbs[i].reDrawDrops(orbs[j].ss, orbs[j].scale);
	    orbs[j].reDrawDrops(orb_i_sector_size, orb_i_scale);
	}

		
    } else { // If orbs differ in number of drops transform
	
	var new_drop_number = orbs[i].num_drops;
	var orb_i_sector_size = orbs[i].ss;
	var orb_i_scale = orbs[i].scale;
	
	// If Dragging Orb from main sector swap dimensions
	if (i < 3) 
	    orbs[i].reDrawDrops(orbs[j].ss, orbs[j].scale);
	
	orbs[j] = new Orb(orbs[j].sf,
			  new_drop_number,
			  orbs[j].default_pos,
			  orb_i_sector_size,
			  orb_i_scale,
			  orbs[j].color)
	
	// Sync timing between orbs
	orbs[j].drop_in_beat = orbs[i].drop_in_beat;
    }


    // Swap center positions
    var orb_i_default_pos = createVector(orbs[i].default_pos.x,
					 orbs[i].default_pos.y);
    
    orbs[i].default_pos = createVector(orbs[j].default_pos.x,
				       orbs[j].default_pos.y);
    orbs[i].center = createVector(orbs[j].default_pos.x,
				  orbs[j].default_pos.y);

    orbs[j].default_pos = orb_i_default_pos;
    orbs[j].default_pos = createVector(orb_i_default_pos.x,
				       orb_i_default_pos.y);    
    
    // Finally swap orb references in array
    orbs.swap(i,j);
    
};

// // Clone Orb
// function cloneOrb(index) {
//     return new Orb(orbs[index].sf,
// 		   orbs[index].num_drops,
// 		   orbs[index].default_pos,
// 		   orbs[index].ss,
// 		   orbs[index].scale,
// 		   orbs[index].color)

// };
    

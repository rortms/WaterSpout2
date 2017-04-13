////////////////////////////////////
//          Orb Class
////////////////////////////////////

function Orb(sound_filename, num_drops, color, scale) {
    
    /////// Initialize Orb Parameters ////////
    
    // Dimensions
    this.orb_D = p5.Vector.mag(createVector(width,height)) * scale; // Scale diameter
    this.num_drops = num_drops;                                     // Number of drops
    this.orb_rad = this.orb_D / 2;                                  // Orbs Radius
    this.drop_D = TWO_PI * this.orb_rad / num_drops;                // Adjusts with number of drops
    this.center = createVector(width/2, height/2);                  // Default Orb center
    
    // Color
    this.color = color;
    
    // Sound
    //this.beat_sound = beat_sound;
    //this.beat_sound.playMode('restart');
    
    // Initialize drops    
    this.drop_pos = [];     // position array
    this.drops= [];   //
    console.log(sound_filename);
    for (var i = 0; i <=num_drops; i++) {

	this.drop_pos.push(createVector(this.orb_rad * cos(TWO_PI / num_drops * i) ,
					this.orb_rad * sin(TWO_PI / num_drops * i)).add(this.center));
	
	this.drops[i] = {'active': false, 'sound': loadSound(sound_filename)};
	
    }


    // Movement
    this.hooked = false
    this.drag_start = createVector(0,0);

    // Position of drop in beat
    this.drop_in_beat = 0
    /////////////////////////////////////////////


    
    /// Paint Orb ///
    this.displayOrb = function(){
			
	// Move drop positions when being dragged
	if (this.hooked) {
	    for (var i = 0; i <=num_drops; i++) {
		
    		this.drop_pos[i] = (createVector(this.orb_rad * cos(TWO_PI / num_drops * i),
    						 this.orb_rad * sin(TWO_PI / num_drops * i)).add(this.center));
	    }
	}

	// Pulse drop radius
	var vary_D = this.drop_D + this.drop_D * 0.08 * random(-1,1);

	// Draw all drops 
	for (var i = 0; i <=num_drops; i++) {
	    pos = this.drop_pos[i]
	    noStroke();
	    
	    ////////////////////////////////////////////
	    ////  Process drop that is in beat
	    if (i == floor(this.drop_in_beat) % num_drops){
		fill(colors.white);
		ellipse(pos.x, pos.y, vary_D, vary_D);

		if (this.drops[i]['active']){
		    if (!this.drops[i]['sound'].isPlaying())
			this.drops[i]['sound'].play();
		}

            ////////////////////////////////////////
	    }else{
		
		if ( ! this.drops[i]['active'] ){
		    fill(this.color);
		    ellipse(pos.x, pos.y, vary_D, vary_D);

		// Clicked drop is shrunken and solid white
		}else{
		    fill(colors.white);
		    ellipse(pos.x, pos.y, this.drop_D * 0.5, this.drop_D * 0.5);}
	    }


	// Update drop in beat gradually over duration of beat
	this.drop_in_beat += 1/beat_time;
	    
	} //end for

    };

    /// For Grabbing the orb ///
    this.isHooked = function() {
	var eps = this.drop_D / 2 
	var dist2_center = p5.Vector.dist(this.center,createVector(mouseX,mouseY));
	// Grab at edges but not at center of drop
	if ( abs(dist2_center - this.orb_D / 2) < eps && abs(dist2_center - this.orb_D / 2) > eps / 2 )
	    return true;
	return false;
    };

    /// For Dragging the orb ///
    this.drag = function() {
	if (this.hooked) {
	    var translation = createVector(mouseX,mouseY).sub(this.drag_start);
	    this.center = createVector(width/2,height/2).add(translation);
	}
    };

    /// Set drop to active
    this.activateDrop = function (){
	var eps = this.drop_D * 0.20;
	var x = mouseX;
	var y = mouseY;
	for ( var i = 0; i <= this.num_drops; i++) {
	    if ( this.drop_pos[i].dist(createVector(x,y)) < eps) {
		this.drops[i]['active'] = ! this.drops[i]['active']
		console.log(x,y)
	    }
	}
    };
    
    /// Reset to initial position
    this.resetOrb = function() {
	this.drag_start = createVector(0,0);
				       
	for (var i = 0; i <=num_drops; i++) {
    	    this.drop_pos[i] = (createVector(this.orb_rad * cos(TWO_PI / num_drops * i),
    					     this.orb_rad * sin(TWO_PI / num_drops * i)).add(this.center));
	}
    };
    
    /// Set Orb's center ///
    this.setCenter = function (x, y) {
	this.center = createVector(x,y);
    };

    
}


////////////////////////////////////
//          Orb Class
////////////////////////////////////

function Orb(sound_filename, num_drops, sector_pos, sector_size, scale, color) {
    /////// Initialize Orb Parameters ////////
    
    ///
    this.sf = sound_filename;
    this.ss = sector_size;
    this.scale = scale;

    
    // Dimensions
    this.orb_D = p5.Vector.mag(createVector(sector_size,sector_size)) * scale; // Scale diameter
    
    this.num_drops = num_drops;                        // Number of drops
    this.orb_rad = this.orb_D / 2;                     // Orbs Radius
    this.drop_D = TWO_PI * this.orb_rad / num_drops;   // Adjusts with number of drops
    this.center = sector_pos;                          // Variable Orb center
    this.default_pos = sector_pos;                     // Default center
    
    // Color
    this.color = color;
    
    // Initialize drops
    this.drop_pos = [];     // position array
    this.drops= [];
    console.log(sound_filename);
    for (var i = 0; i < num_drops; i++) {

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
	
	// Update drop in beat gradually over duration of beat
	this.drop_in_beat += 1/beat_time;
	
	// Move drop positions when being dragged
	if (this.hooked) {
	    for (var i = 0; i <=num_drops; i++) {
		
    		this.drop_pos[i] = createVector(this.orb_rad * cos(TWO_PI / num_drops * i),
    						this.orb_rad * sin(TWO_PI / num_drops * i)).add(this.center);
	    }
	}

	// Pulse drop radius
	var vary_D = this.drop_D + this.drop_D * 0.08 * random(-1,1);

	// Draw all drops 
	for (var i = 0; i < num_drops; i++) {
	    pos = this.drop_pos[i]
	    noStroke();
	    
	    ////////////////////////////////////////////
	    //      Process drop that is in beat
	    if (i == floor(this.drop_in_beat) % num_drops){
		fill(colors.white);
		ellipse(pos.x, pos.y, vary_D, vary_D);

		if (this.drops[i]['active']){
		    if (!this.drops[i]['sound'].isPlaying())
			this.drops[i]['sound'].play();
		}

	    ////////////////////////////////////////////
		
	    }else{ /// Just draw the drop
		
		if ( ! this.drops[i]['active'] ){
		    fill(this.color);
		    ellipse(pos.x, pos.y, vary_D, vary_D);

		// Clicked drop is shrunken and solid white
		}else{
		    fill(colors.white);
		    ellipse(pos.x, pos.y, this.drop_D * 0.5, this.drop_D * 0.5);}
	    }

	} //end for

    };

    /// For Grabbing the orb ///
    this.isHooked = function() {
	var eps = this.drop_D / 2;
	var dist2_center = p5.Vector.dist(this.default_pos, createVector(mouseX,mouseY));
	// Grab at edges but not at center of drop
	if ( abs(dist2_center - this.orb_D / 2) < eps && abs(dist2_center - this.orb_D / 2) > eps / 2 )
	    return true;
	return false;
    };

    /// For Dragging the orb ///
    this.drag = function() {
	if (this.hooked) {
	    var translation = createVector(mouseX,mouseY).sub(this.drag_start);
	    this.center = translation.add(this.default_pos);
	}
    };

    /// Set drop to active
    this.activateDrop = function (){
	var eps = this.drop_D * 0.20;
	var x = mouseX;
	var y = mouseY;
	for ( var i = 0; i < this.num_drops; i++) {
	    if ( this.drop_pos[i].dist(createVector(x,y)) < eps) {
		this.drops[i]['active'] = ! this.drops[i]['active'];
	    }
	}
    };
    
    /// Reset to initial position
    this.resetOrb = function() {
	this.drag_start = createVector(0,0);
				       
	for (var i = 0; i < num_drops; i++) {
    	    this.drop_pos[i] = createVector(this.orb_rad * cos(TWO_PI / num_drops * i),
    					    this.orb_rad * sin(TWO_PI / num_drops * i)).add(this.default_pos);
		    
	}
    };


    // Redraw drops
    this.reDrawDrops = function(new_size, scale) {

	this.ss = new_size;
	this.scale = scale;
	this.orb_D = p5.Vector.mag(createVector(new_size,new_size)) * scale; // Scale diameter
	this.orb_rad = this.orb_D / 2;                                       // Orbs Radius
	this.drop_D = TWO_PI * this.orb_rad / num_drops;                     // Adjusts with number of drops

        for (var i = 0; i < num_drops; i++) {

	    this.drop_pos[i] = createVector(this.orb_rad * cos(TWO_PI / num_drops * i) ,
					    this.orb_rad * sin(TWO_PI / num_drops * i)).add(this.default_pos);
	    
	}
    };
    
    /// Set Orb's center ///
    this.setDefaultCenter = function (new_pos) {
	this.default_pos = new_pos;
    };

}

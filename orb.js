/// Orb Class


function Orb(num_drops, color) {
    
    /////// Orb Parameters ////////
    this.orb_D = p5.Vector.mag(createVector(width,height)) * 0.4; // Scale diameter
    this.num_drops = num_drops;                                   // Number of drops
    this.orb_rad = this.orb_D / 2;                                // Orbs Radius
    this.drop_D = TWO_PI * this.orb_rad / num_drops;              // Adjusts with number of drops
    this.center = createVector(width/2, height/2);                // Default Orb center
    this.color = color;

    // Initialize drops
    this.drop_pos = [];
    for (var i = 0; i <=num_drops; i++) {
	
    	this.drop_pos.push(createVector(this.orb_rad * cos(TWO_PI / num_drops * i),
    					this.orb_rad * sin(TWO_PI / num_drops * i)).add(this.center));
    }

    // Movement
    this.hooked = false
    this.drag_start = createVector(0,0);
    
    //Drop state: ON/OFF
    ///console.log("OrbR, dropR"+this.orb_rad, this.drop_D);


    /////// Orb Methods  ////////
    
    /// Paint It ///
    this.displayOrb = function(){
	// Update drops
	if (this.hooked) {
	    for (var i = 0; i <=num_drops; i++) {
		
    		this.drop_pos[i] = (createVector(this.orb_rad * cos(TWO_PI / num_drops * i),
    						 this.orb_rad * sin(TWO_PI / num_drops * i)).add(this.center));
	    }
	}

	var vary_D = this.drop_D + this.drop_D * 0.08 * random(-1,1);
	
	for (let pos of this.drop_pos)  {
	    noStroke();
	    fill(this.color);
	    ellipse(pos.x, pos.y, vary_D, vary_D);
	}
	///console.log("Big D: " + this.orb_D);
    }

    /// For grabbing the orb ///
    this.isHooked = function() {
	var eps = 10
	var dist2_center = p5.Vector.dist(this.center,createVector(mouseX,mouseY));
	if ( abs(dist2_center - this.orb_D / 2) < eps )
	    return true;
	return false;
    }

    /// For dragging the orb ///
    this.drag = function() {
	if (this.hooked) {
	    var translation = createVector(mouseX,mouseY).sub(this.drag_start);
	    this.center = createVector(width/2,height/2).add(translation);
	}
    }
    
    /// Recet to initial position ///
    this.resetOrb = function() {
	this.drag_start = createVector(0,0);
				       
	for (var i = 0; i <=num_drops; i++) {
    	    this.drop_pos[i] = (createVector(this.orb_rad * cos(TWO_PI / num_drops * i),
    					     this.orb_rad * sin(TWO_PI / num_drops * i)).add(this.center));
	    }
	
    }
    
    /// Set Orb's center ///
    this.setCenter = function (x, y) {
	this.center = createVector(x,y);
    }

    
}


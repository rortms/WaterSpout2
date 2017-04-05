/// Orb Class

function Orb(orb_rad, drop_rad) {

    // Orb Geometry
    this.orbD = p5.Vector.mag(createVector(width,height)) * 0.4  // Scale diameter
    
    this.Orb_rad = orb_rad;                       //Orbs Radius
    this.drop_rad = drop_rad;                     //Radius of each drop
    this.center = createVector(width/2, height/2);//Default Orb center

    // Movement
    this.hooked = false

    
    //Drop state: ON/OFF
    console.log(this.Orb_rad, this.drop_rad);

    /// Paint It ///
    this.displayOrb = function(){
	noFill()	
	stroke('#42A5f5')
	strokeWeight(this.orbD * 0.02)
	ellipse(this.center.x, this.center.y,
		this.orbD, this.orbD);

	
	console.log("Big D: " + this.orbD);
    }

    // For grabbing the orb
    this.isHooked = function() {
	var eps = 10
	var dist2_center = p5.Vector.dist(this.center,createVector(mouseX,mouseY));
	if ( abs(dist2_center - this.orbD / 2) < eps )
	    return true;
	return false;
    }

    // For dragging the orb
    this.drag = function() {
	if (this.hooked) {
	    this.center = createVector(mouseX,mouseY)
	    
	}
    }

    
}

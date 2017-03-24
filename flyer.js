/// Flyer Class 
function Flyer() {
    
    /////////// Iitialize flyer ////////////
    this.position = createVector(width/2,height/2);
    this.velocity = createVector(2, 0)
	.rotate(random(-PI,PI));

    this.tail = [];
    for (var i = 0; i<3; i++) {
    	this.tail.push(createVector(width/2, height/2));
    }
    
    this.D = p5.Vector.mag(createVector(width,height)) * 0.035  // Flyer's diameter to scale
    
    this.pcount =0;
    this.frame_skip =0;

    //// Move it ////
    this.move = function() {
	var eps = 10
	// Store passed position
	if (this.frame_skip%4 == 0) {
	    this.tail[this.pcount%3] =
		createVector(this.position.x,this.position.y);
	    this.pcount++;
	}

	// Collision detection
	if (width - this.position.x <= eps|| this.position.x <= eps){
	    this.velocity.x *= -1.0;
	}
	if (height - this.position.y <= eps || this.position.y <= eps){
	    this.velocity.y *= -1.0;
	}
	
	// Move position
	this.position = this.position.add(this.velocity);

	this.frame_skip++
    }
    
    //// Paint it ////
    this.display = function() {
	ellipse(this.position.x, this.position.y, this.D, this.D)
	for (var i=0; i<3; i++) {
	    var d = this.D*pow(0.8, i+1);
	    noStroke()
	    ellipse(this.tail[i].x, this.tail[i].y, d, d);
	}
    }

    /// Update heading ///
    this.trackTouch = function() {
	
	// Get new heading
	var heading = p5.Vector.sub(createVector(mouseX, mouseY),
				    this.position).normalize();
	
	var speed = createVector(mouseX-pmouseX, mouseY-pmouseY).mag();

	// Velocity proportional to dragging speed
	this.velocity = heading.mult(speed);
    }
    
};

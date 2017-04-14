////////////////////////////////////
//          Flyer Class
////////////////////////////////////


function Flyer(color, size) {
    
    /////////// Iitialize flyer ////////////
    this.position = createVector(main_width/2,main_height/2);
    this.velocity = createVector(2, 0)
	.rotate(random(-PI,PI));

    this.tail_length = 3;
    this.tail = [];
    for (var i = 0; i<this.tail_length; i++) {
    	this.tail.push(createVector(main_width/2, main_height/2));
    }
    
    this.D = p5.Vector.mag(createVector(size, size)) * 0.035;  // Flyer's diameter to scale
    this.color = color;
    /////////////////////////////////////////

    

    //// Move flyer ///
    this.move = function() {
	var eps = this.D * 0.4
	// Store passed position
	if (frameCount%4 == 0) {
	    this.tail[frameCount%this.tail_length] =
		createVector(this.position.x,this.position.y);
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
    };

    /// Update flyer heading ///
    this.trackTouch = function() {
	
	// Get new heading
	var heading = p5.Vector.sub(createVector(mouseX, mouseY),
				    this.position).normalize();
	
	var speed = createVector(mouseX-pmouseX, mouseY-pmouseY).mag();

	// Velocity proportional to dragging speed
	this.velocity = heading.mult(speed);
    };
    
    //// Paint flyer ////
    this.displayFlyer = function() {
	noStroke()
	fill(this.color)
	ellipse(this.position.x, this.position.y, this.D, this.D);
	for (var i=0; i<this.tail_length; i++) {
	    var d = this.D*pow(0.8, i+1);
	    ellipse(this.tail[i].x, this.tail[i].y, d, d);
	}
    };

    
}

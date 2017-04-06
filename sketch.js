var flyer; // Declare object
var orb; 

function setup() {
    createCanvas(800, 640);
    flyer = new Flyer();
    orb = new Orb(18);
}

function draw() {
    background(50, 89, 100);    
    orb.displayOrb()
    flyer.move();
    flyer.displayFlyer();
}

// Make flyer track touch
function mouseDragged() {
    flyer.trackTouch();
    console.log(orb.hooked);
    orb.drag()
}

function mouseClicked() {
    if (orb.isHooked()) {	
	orb.hooked = true;
	orb.drag_start = createVector(mouseX,mouseY);
    }
}

function mouseReleased() {
    orb.hooked = false;
    orb.setCenter(width/2, height/2);
    orb.resetOrb();
}

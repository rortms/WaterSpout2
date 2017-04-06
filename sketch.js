var flyer; // Declare object
var orb;

colors = { red : "#F44336",
	   pink: "#E91E63",
	   purple: "#9C27B0",
	   deep_purple: "#673AB7",
	   indigo: "#3F51B5",
	   blue: "#2196F3",
	   light_blue: "#03A9F4",
	   cyan: "#00BCD4",
	   ateal: "#1DE9B6",
	   lime: "#C6FF00",
	   yellow: "#FFEB3B",
	   amber: "#FFC107",
	   burnt_orange: "#FF9800",
	   orange: "#FF5722",
	   black: "#000000",
	   white: "#FFFFFF",
	   grey: "#607D8B",
	 };
	   
console.log(colors.yellow);

function setup() {
    createCanvas(800, 640);
    flyer = new Flyer(colors.lime);
    orb = new Orb(18, colors.blue);
}

function draw() {
    background(colors.black);    
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

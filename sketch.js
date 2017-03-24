var flyer; // Declare object

function setup() {
    createCanvas(800, 640);
    flyer = new Flyer();
}

function draw() {
    background(50, 89, 100)
    flyer.move();
    flyer.display();

    // Make flyer track touch
}


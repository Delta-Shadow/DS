let ptns = [];
let precision = 15; // Number of Points in each side
let r = 100; // Radius of Delta's circumcircle

let FPS = 20; // Frames per second
let COLOR = 100; // Stroke Color of Delta
let BG = 0;
let mask = 0; // Opacity of Fade in Effect

let mode = 1; // Used to control animation Segments - Drawing, Fading and shift to main content

function generatePoints() {
	let tempPtns = [];
	let a = radians(270);
	
	for (let i = 0; i < 3; i++) {
		a += radians(120);
		tempPtns.push( {x: width/2 + (cos(a) * r), y: height/2 + (sin(a) * r)} );
	}
	
	addLerpPoints(tempPtns[0], tempPtns[1]);
	addLerpPoints(tempPtns[1], tempPtns[2]);
	addLerpPoints(tempPtns[2], ptns[0]);
}

function addLerpPoints(curr, target) {
	let count = 0;
	ptns.push( {x: curr.x, y: curr.y} );
	
	while(count < precision) {
		curr.x = (curr.x + target.x)/2;
		curr.y = (curr.y + target.y)/2;
		ptns.push( {x: curr.x, y: curr.y} );
		count++;
	}
}

function drawFirstSeg() {
	line(ptns[0].x, ptns[0].y, ptns[1].x, ptns[1].y);
}

function drawMiddleSegs() {
	line(ptns[frameCount].x, ptns[frameCount].y, ptns[frameCount+1].x, ptns[frameCount+1].y);
}

function drawLastSeg() {
	line(ptns[frameCount].x, ptns[frameCount].y, ptns[0].x, ptns[0].y);
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(BG); stroke(COLOR); noFill();
	frameRate(FPS);
	
	generatePoints();
	
	drawFirstSeg();
}

function draw() {
        if (mode != 3) {
            stroke(COLOR);
        }

	if (frameCount < ptns.length - 1) {
		drawMiddleSegs();
	} else if (frameCount == ptns.length - 1) {
		drawLastSeg();
		mode = 2;
	}

        if (mode == 2) {
            if (mask <= 1) {
                mask += 0.05;
            } else {
                mode = 3;
		if (typeof main === "function") {
                    clear();
                    main();
		}
            }
        }

	if (mode == 3 && typeof roll === "function") {
            roll();
	}

        if (mode != 3) {
            fill("rgba(0, 0, 0, " + mask + ")");
            noStroke();
            rect(0, 0, width, height);
        }
}

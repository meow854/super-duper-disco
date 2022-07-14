sketch= "";
timer= 0;
timecheck= "";
sketchguess= "";
correct= "";
score= 0;
sa= "w";

function preload() {
    classifier= ml5.imageClassifier("DoodleNet");
}
function setup() {
    canvas= createCanvas(600, 600);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas());
}

arraydrawings= ['Crown', 'Grass', 'Drums', 'Swan', 'Nose', 'Paint Can', 'Grapes', 'Bottlecap', 'Feather', 'Diamond', 'Sailboat', 'Eraser'];
randomnum= Math.floor(Math.random() * arraydrawings.length + 1);
sketch= arraydrawings[randomnum];
console.log(sketch);
document.getElementById("drawn").innerHTML= "Sketch To Be Drawn - " + sketch;

function draw() {
    checksketch();
    check();
    strokeWeight(5);
    stroke("#42a4f5");
    if(mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function check() {
    if(sketchguess == sketch) {
        correct= "set";
        score= score + 10;
        document.getElementById("score").innerHTML= "Score: " + score;
    }
}

function cleancanvas() {
    canvas.background("white");
}

function checksketch() {
    if(sa == "w") {
        timer++;
        document.getElementById("timer").innerHTML= "Timer: " + timer;
        console.log(timer);
    }

    if(timer >= 500) {
        timer= 0;
        timecheck= "yay";
    }

    if(timecheck == "yay" || correct == "set") {
        timecheck= "";
        correct= "";
        cleancanvas();
    }
}

function classifyCanvas() {
    classifier.classify(canvas, gotresult);
}

function gotresult(error, results) {
    if(error) {
        console.error();
    }
    console.log(results);
    sketch= results[0];
    document.getElementById("sketchname").innerHTML= "Your Sketch - " + sketch;
}
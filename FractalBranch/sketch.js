//global variables
var len = 100; //starting length of the axiom branch
var thickness = 12; //starting thickness of the axiom branch
var thicknessDegrade = 0.78; //multiplier for thickness, to thin it out
var count = 0; //counter for iterations have been done
var seed = 22; //starting seed
var noiseValue = 0; //starting noise value
var noiseStep = 0.05; //what step is taken when going through the noise space(1D)
var paramNoiseOffsets = noiseValue; //the offset of the step, to go through the noise
var offSetStep = 0.5; //the amount the above thing gets changed each time
var seedStep = 22; //ammount we change the seed by with each press;
var iterationsLimit = 50; //check against to avoid infinite tree; set way highter
var lengthLimit = 5; //the limit to how small branches can - they still get a little bit below that but still end;
const gRatio = 0.6180339887; //const of -(1/goldenratio);
var minAngle = 10; // min angle
var maxAngle = 22; //min and max angle for branches to branch off;
var minLengthMod = 104; // min ammount that length gets shortened by (this is multiplied by gRatio, hens why its over 100);
var maxLengthMod = 144; // max ----//--- ()
var root, tree = [], //the root/axiom, array for the branches and one for the leaves
  leaves = [];
var treeNumber = 1; // to display which tree we are on, counting from the start of the program;
var keyCodeForNext = 78; //keyCode for which button will be used; 78 = 'n';

//variables for debugging
var noiseResult;
var logLength, logAngle, logInclusion;
var gassianMean = 1,
  gassianSD = 0.9;

//setup function that is called on runtime, part of the p5.js library
//pretty much the same as window.onLoad = function(){}
function setup() {
  createCanvas(800, 600); //manageable size on my laptop

  //sets up the noise, with a preset seed, and starting value;
  initNoise(seed, noiseValue);
  //initialises the entire tree- axiom, branches and leaves;
  initTree();
  //creates a Dom element to display some text, usefull for users, at the bottom
  myP = createP("Tree number: " + treeNumber);
}

//init the noise with a seed and starting value;
function initNoise(seed, noiseValue) {
  noiseSeed(this.seed);
  randomSeed(this.seed);
  //noiseResult = noise(this.noiseValue);

}

//helper function to setup the tree, leaves,
function initTree() {
  //clean the arrays, for keyPressed, so arrays don't overflood;
  tree.length = 0;
  leaves.length = 0;
  //using vectors, part of the p5.js library
  var a = createVector(width / 2, height);
  var b = createVector(width / 2, height - len);

  //create the root/axiom starting at a and ending at b with a thickness
  root = new Branch(a, b, thickness);
  //add it to the array
  tree[0] = root;

  //generate the branches/tree
  addBranches();
  //generate the leaves at the end branches
  addLeaves();

  //resets the count so arrays can be refilled on mousePressed;
  count = 0;
}

// cycle through noise on mouse button being pressed
function keyPressed() {
  if (keyCode == keyCodeForNext) {

    //change the seed by some abitrary amount, doesn't matter, just as long as we get a new tree;
    seed += seedStep;
    //resets paramNoiseOffsets;
    paramNoiseOffsets = noiseValue;

    //reinitilise the nosie;
    //this needs to be done before building the Tree as it uses it; (learned this through a glitch);
    initNoise(seed, noiseValue);
    initTree();
    redraw();
    //removes the Dom elems, so the <p>'s with the text don't stack down the page;
    removeElements();
    treeNumber++;
    myP = createP("Tree number: " + treeNumber); //creates a <p> element; part of the p5.dom library;

    //debugToConsole();  //print a bunch of things to the console; see function for more info;
  }
}

//substituting mousePressed in tutorials
function addBranches() {
  //if it reaches 49 iterations, stop; this bigger than the next if so as to allow it to terminate it first,
  //but this is still required;
  if (count < iterationsLimit) {
    //go through the array, backwards
    for (var i = tree.length - 1; i >= 0; i--) {
      if (tree[i].branchLength > lengthLimit) {
        //finished is like drawn = true; each element in tree having a start and end pint
        if (!tree[i].finished) {
          //grow 2 branches, using the current one as a start point
          //e.i. they get added to the end of the current one
          //and then they get added to the array
          tree.push(tree[i].growBranchLeft());
          tree.push(tree[i].growBranchRight());
        }
        //mark the branch in the array we just appended the branches too as finished, to avoid doubles and
        //excess drawing
        tree[i].finished = true;

      }
    }
    //offset the noise and params a bit, creates some randomness as it moves a bit through the noise feild;
    offSetStep += 0.05;

    count++;
    //go in another level/iteration; recursion;
    addBranches();
  }

}

function addLeaves() {
  for (var i = tree.length - 1; i >= 0; i--) { // for each branch in the tree
    if (!tree[i].finished) { // if it has not been drawed
      var leaf = tree[i].end.copy(); //get its end point
      leaves.push(leaf); //add it to the array
    }
  }
}

//part of p5.js libraries, draws thing to the screen continuously
function draw() {

  background('#6495ED'); //cornflower blue #6495ED

  //draw all the branches of the tree array
  for (var i = 0; i < tree.length; i++) {
    tree[i].show();

    //debugBranches(tree[i]);       //displays attribues next to branges, not as usefull as console printing it but still;
  }

  //draw the leaves
  var leaveSize = 0;
  paramNoiseOffsets += offSetStep;
  for (var i = 0; i < leaves.length; i++) {
    //offsets for leaves color, ranges keep in
    paramNoiseOffsets += offSetStep;
    var r = Math.round(getRandomIntInclusive(51, 204));
    paramNoiseOffsets += offSetStep;
    var g = Math.round(getRandomIntInclusive(102, 255));
    paramNoiseOffsets += offSetStep;
    var b = Math.round(getRandomIntInclusive(0, 26));

    fill('rgb( ' + r + ', ' + g + ',' + b + ' )');
    noStroke(); //no outline
    leaveSize = Math.round(getRandomIntInclusive(4, 15));
    ellipse(leaves[i].x, leaves[i].y, leaveSize, leaveSize);
  }

  //debugGraphs();    //enable to draw graphis, helped a bit when debugging;
  noLoop(); // looping disabled, so it only draws it once
}


//-------------------------
// Helper functions
//------------------------

//the gaussian noise adds more controlled pseudo-randomness as it seems to be seeded;

//for randomizing the lenth
function lengthRandomizer(min, max) {
  paramNoiseOffsets = paramNoiseOffsets + randomGaussian(gassianMean, gassianSD);
  logLength = getRandomIntInclusive(min, max) / 100;
  return logLength;
}
//get a random angle,
function angleRandomizer(min, max) {
  paramNoiseOffsets += randomGaussian(gassianMean, gassianSD);
  logAngle = getRandomIntInclusive(min, max);
  return logAngle;
}

//get psuedo-random number in a range
function getRandomIntInclusive(min, max) {
  //restrain the result to within a range - i admit the name of some of these functions may not be the best;
  logInclusion = (noise(noiseValue + paramNoiseOffsets) * (max - min + 1)) + min; //restrains it within a range;
  return logInclusion;
}


//------------------------------
//for debugging purposes
//------------------------------

function debugToConsole() {
  //console debugging purposes
  println("noiseValue = " + noiseValue);
  println("noiseResult = " + noiseResult);
  println("logAngle = " + logAngle);
  println("logLength = " + logLength);
  println("logInclusion = " + logInclusion);
  println("tree.lenght = " + tree.length);
  println("leaves.length = " + leaves.length);
  println("tree[100].branchLength = " + tree[100].branchLength);
  println("paramNoiseOffsets = " + paramNoiseOffsets);
  println(""); //newline
}

function debugGraphs() {
  //-------------------------
  //debugging
  //-------------------------

  fill('#000000');
  //text(noiseValue, 100, 100);
  text("1.0", 0, 50);
  text("0.0(y=50)", 0, 100);
  text("-1.0", 0, 150);

  stroke('#222222');
  //strokeWeight(2);
  //line(0, 100, width, 100);
  noFill();
  beginShape();
  var nx = noiseValue;
  stroke("#ff3399");
  strokeWeight(7);
  point(0, 100 * noise(nx));
  stroke('#222222');
  strokeWeight(1);
  text(noise(nx), 100, 100);
  for (var x = 0; x < width; x++) {

    var y = 100 * noise(nx);
    vertex(x, y);
    nx += noiseStep;

  }

  endShape();
  for (var y = 150; y < 250; y++) {
    var x = 100 * randomGaussian(gassianMean, gassianSD);
    line(50, y, x, y);
  }
  //---------------------------------------------
  //end of output code to help with debugging
  //---------------------------------------------
}

function debugBranches(treeBranch) {
  //noStroke();
  fill('#000000');
  //branches length
  text(treeBranch.branchLength.toFixed(2),
    treeBranch.begin.x + 0.50 * (treeBranch.end.x - treeBranch.begin.x),
    treeBranch.begin.y + 0.50 * (treeBranch.end.y - treeBranch.begin.y));

}

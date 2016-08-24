//global variables
var len = 100;
var thickness = 10;
var thicknessDegrade = 0.78;
var count = 0;
var seed = 22;
var noiseValue = 0;
var noiseStep = 0.05;
//var degrees = 30;
var root, tree = [],
  leaves = [];

//variables for debugging
var noiseResult;
var logLength, logAngle, logInclusion;

//setup function that is called on runtime, part of the p5.js library
//pretty much the same as window.onLoad = function(){}
function setup() {
  createCanvas(800, 600); //manageable size on my laptop

  //sets up the noise, with a preset seed, and starting value;
  initNoise(seed, noiseValue);
  initTree();

}

//init the noise with a seed and starting value;
function initNoise(seed, noiseValue) {
  noiseSeed(this.seed);
  noiseResult = noise(this.noiseValue);

}

//helper function to setup the tree, leaves,
function initTree() {
  //clean the arrays, for mousePressed
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
function mousePressed() {
  //increase the noise value by a set step - the smaller the step, the smoother
  //the result;
  noiseValue += noiseStep;

  //reinitilise the nosie;
  //this needs to be done before building the Tree as it uses it; (learned this through a glitch);
  initNoise(seed, noiseValue);
  initTree();
  redraw();

  //console debugging purposes
  println("noiseValue = " + noiseValue);
  println("noiseResult = " + noiseResult);
  println("logAngle = " + logAngle);
  println("logLength = " + logLength);
  println("logInclusion = " + logInclusion);
  println("tree.lenght = " + tree.length);
  println("leaves.length = " + leaves.length);
  println("tree[100].branchLength = " + tree[100].branchLength);
  println();
}

//substituting mousePressed in tutorials
function addBranches() {
  //if it reaches 49 iterations, stop; this bigger than the next if so as to allow it to terminate it first,
  //but this is still required;
  if (count < 50) {
    //go through the array, backwards
    for (var i = tree.length - 1; i >= 0; i--) {
      if (tree[i].branchLength > 5) {
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

    count++;
    //go in another level/iteration; recursion;
    addBranches();
  }

}

function addLeaves() {
  for (var i = 0; i < tree.length; i++) { // for each branch in the tree
    if (!tree[i].finished) { // if it has not been drawed
      var leaf = tree[i].end.copy(); //get its end point
      leaves.push(leaf);             //add it to the array
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
  for (var i = 0; i < leaves.length; i++) {
    fill('rgb( ' + Math.round(getRandomIntInclusive(51, 255)) + ', ' +
      Math.round(getRandomIntInclusive(102, 255)) + ',' +
      Math.round(getRandomIntInclusive(0, 0)) + ' )');
    noStroke();
    leaveSize = getRandomIntInclusive(4, 10);
    ellipse(leaves[i].x, leaves[i].y, leaveSize, leaveSize);
  }

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
  point(0,100*noise(nx));
  stroke('#222222');
  strokeWeight(1);
  text(100*noise(nx), 100, 100);
  for (var x = 0; x < width; x++) {

    var y = 100 * noise(nx);
    vertex(x, y);
    nx += noiseStep;
  }

  endShape();

  //end of output code to help with debugging

  noLoop(); // looping disabled, so it only draws it once
}


//-------------------------
// Helper functions
//------------------------


//for randomizing the lenth
function lengthRandomizer() {
  logLength = getRandomIntInclusive(68, 84) / 100;
  return logLength;
}
//get a random angle,
function angleRandomizer() {
  logAngle = getRandomIntInclusive(0, 30);
  return logAngle;
}

//get psuedo-random number in a range
function getRandomIntInclusive(min, max) {
  //randomSeed(15124551); //works only with p5.js random(), but noise is 'smoother' and more 'natural';
  //random() for p5.js random and Math.random default javascript
  //return Math.round(Math.random() * (max - min + 1)) + min; //old way, using Math.random();

  logInclusion = (noiseResult * (max - min + 1)) + min;   //restrains it within a range;
  return logInclusion;
}


//for debugging purposes
function debugBranches(treeBranch) {
  //noStroke();
  fill('#000000');


  //branches length
  text(treeBranch.branchLength.toFixed(2),
    treeBranch.begin.x + 0.50 * (treeBranch.end.x - treeBranch.begin.x),
    treeBranch.begin.y + 0.50 * (treeBranch.end.y - treeBranch.begin.y));

}

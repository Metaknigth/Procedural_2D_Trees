//global variables
var len = 100;
var thickness = 10;
var thicknessDegrade = 0.78;
var count = 0;
var seed = 22;
var noiseValue = 0;
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

  initNoise(seed, noiseValue);
  initTree();

  // //using vectors, part of the p5.js library
  // var a = createVector(width / 2, height);
  // var b = createVector(width / 2, height - len);
  //
  // //create the root/axiom starting at a and ending at b with a thickness
  // root = new Branch(a, b, thickness);
  // //add it to the array
  // tree[0] = root;
  // //generate the rest of the array, then in Draw display it
  // //generate the branches/tree
  // addBranches();
  // //generate the leaves at the end branches
  // addLeaves();


  //randomSeed(20);
  //create some noise;

  //noiseSeed(100);


}

// add branches on mouse button being pressed
// function mousePressed() {
//   addBranches();
// 	redraw();
// }

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
  //generate the rest of the array, then in Draw display it
  //generate the branches/tree
  addBranches();
  //generate the leaves at the end branches
  addLeaves();
  count = 0;
}

// add branches on mouse button being pressed
function mousePressed() {
  //addBranches();
  noiseValue += 0.5;
  initNoise(seed, noiseValue);
  initTree();
  redraw();
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
  if (count < 50) {

    for (var i = tree.length - 1; i >= 0; i--) {
      if (tree[i].branchLength > 5) {
        //finished is like drawn = true; each element in tree having a start and end pint
        if (!tree[i].finished) {
          tree.push(tree[i].growBranchLeft());
          tree.push(tree[i].growBranchRight());
        }
        tree[i].finished = true;

      }
    }

    count++;
    addBranches();
  }

}

function addLeaves() {
  for (var i = 0; i < tree.length; i++) { // for each branch in the tree
    if (!tree[i].finished) { // if it has not been drawed
      var leaf = tree[i].end.copy();
      leaves.push(leaf);
    }
  }
}

//part of p5.js libraries, draws thing to the screen continuously
function draw() {

  background('#6495ED'); //cornflower blue #6495ED

  //draw all the branches of the tree array
  for (var i = 0; i < tree.length; i++) {
    tree[i].show();

    //debugBranches(tree[i]);
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

  //debugging
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
  for (var x = 0; x < width; x++) {
    nx += 0.1;
    var y = 100 * noise(nx);
    vertex(x, y);
  }
  text(y, 100, 100);
  endShape();


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
  logAngle = getRandomIntInclusive(10, 30);
  return logAngle;
}

function initNoise(seed, noiseValue) {
  noiseSeed(this.seed);
  noiseResult = noise(this.noiseValue);

}

// function getRandomIntInclusive(min, max) {
//   //randomSeed(15124551); //works only with p5.js random()
//   //random() for p5.js random and Math.random default javascript
//   return Math.round(Math.random() * (max - min + 1)) + min;
// }

//noise version
// function getRandomIntInclusive(min, max) {
//   //randomSeed(15124551); //works only with p5.js random()
//   //random() for p5.js random and Math.random default javascript
//   //noiseSeed(20);
//   //noiseValue = noiseSeedV;
//   g++;
//   randomValuesStorage[g] = noise(noiseValue);
//   return (randomValuesStorage[g] * (max - min + 1)) + min;
//
// }

function getRandomIntInclusive(min, max) {
  //randomSeed(15124551); //works only with p5.js random()
  //random() for p5.js random and Math.random default javascript
  //return Math.round(Math.random() * (max - min + 1)) + min;

  logInclusion = (noiseResult * (max - min + 1)) + min;
  return logInclusion;
}

// function getRandomIntInclusive(min, max) {
//   randomSeed(1512); //works only with p5.js random()
//   //random() for p5.js random and Math.random default javascript
//   //return Math.round(Math.random() * (max - min + 1)) + min;
//   noiseResult = random();
//   logInclusion = (noiseResult * (max - min + 1)) + min;
//   return logInclusion;
// }



//for debugging purposes
function debugBranches(treeBranch) {
  //noStroke();
  fill('#000000');


  //branches length
  text(treeBranch.branchLength.toFixed(2),
    treeBranch.begin.x + 0.50 * (treeBranch.end.x - treeBranch.begin.x),
    treeBranch.begin.y + 0.50 * (treeBranch.end.y - treeBranch.begin.y));

}

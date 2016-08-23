//global variables
var len = 100;
var thickness = 10;
var thicknessDegrade = 0.78;
var count = 0;
//var degrees = 30;
var root, tree = [],
  leaves = [];

//setup function that is called on runtime, part of the p5.js library
//pretty much the same as window.onLoad = function(){}
function setup() {
  createCanvas(800, 600); //manageable size on my laptop

  //using vectors, part of the p5.js library
  var a = createVector(width / 2, height);
  var b = createVector(width / 2, height - len);

  //create the root/axiom starting at a and ending at b with a thickness
  root = new Branch(a, b, thickness);
  //add it to the array
  tree[0] = root;
  //generate the rest of the array, then in Draw display it
  addBranches();
  addLeaves();
}

// add branches on mouse button being pressed
// function mousePressed() {
//   addBranches();
// 	redraw();
// }

//substituting mousePressed in tutorials
function addBranches() {
  if (count < 50) {

    for (var i = tree.length - 1; i >= 0; i--) {
      if (tree[i].branchLength > 4) {

        if (!tree[i].finished) { //finished is like drawn = true; each element in tree having a start and end pint
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
    //tree[i].jitter();
  }

  //draw the leaves
  var leaveSize = 0;
  for (var i = 0; i < leaves.length; i++) {
    fill('rgb( ' + getRandomIntInclusive(51, 255) + ', ' + getRandomIntInclusive(102, 255) + ',' +
      getRandomIntInclusive(0, 0) + ' )');
    noStroke();
    leaveSize = getRandomIntInclusive(4, 10);
    ellipse(leaves[i].x, leaves[i].y, leaveSize, leaveSize);
  }
  noLoop(); // looping disabled, so it only draws it once
}


//-------------------------
// Helper functions
//------------------------


//for randomizing the lenth
function lengthRandomizer() {
  return getRandomIntInclusive(68, 84) / 100
}
//get a random angle,
function angleRandomizer() {
  return getRandomIntInclusive(10, 30)
}

function getRandomIntInclusive(min, max) {
  return Math.round(Math.random() * (max - min + 1)) + min;
}

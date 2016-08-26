function Branch(begin, end, thickness) {
  this.begin = begin;
  this.end = end;
  this.thickness = thickness;
  this.branchV = p5.Vector.sub(this.begin,this.end); //p5.js function
  this.angle = this.branchV.heading(); // p5.js function for angle of vector
  this.branchLength = this.branchV.mag(); //p5.js function for magnitude of vector
  this.finished = false; // flags a branch as traversed - that it has spawned branches


  //fucntion for displaying a branch, uses line from p5.js
  this.show = function() {
    stroke('#805500');
    strokeWeight(this.thickness);
    line(this.begin.x,this.begin.y,this.end.x,this.end.y);
  }

  //grows a branch to the right
  this.growBranchRight = function() {
    var dir = p5.Vector.sub(this.end,this.begin); //append it to the existing branch
    dir.rotate(angleRandomizer() * Math.PI/180);  //randomize angle
    dir.mult(0.61803 * lengthRandomizer(104,148));                 //shorten branches
    var newEnd = p5.Vector.add(this.end,dir);     //save new endpoint in var

    //create new branch, which is less thick by a degree of thicknessDegrade;
    var right = new Branch(this.end, newEnd, this.thickness * thicknessDegrade);
    return right;
  }

  //grow a branch to the left
  this.growBranchLeft = function() {
    var dir = p5.Vector.sub(this.end,this.begin); //append it to the existing branch
    dir.rotate(-angleRandomizer() * Math.PI/180); //randomize angle, the in other direction
    dir.mult(0.61803 * lengthRandomizer(104,148));                 //shorten branches
    var newEnd = p5.Vector.add(this.end,dir);     //save new endpoint in var

    //create new branch, which is less thick by a degree of thicknessDegrade;
    var left = new Branch(this.end, newEnd, this.thickness * thicknessDegrade);
    return left;
  }
}

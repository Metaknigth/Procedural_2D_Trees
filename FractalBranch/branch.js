function Branch(begin, end, thickness) {
  this.begin = begin;
  this.end = end;
  this.thickness = thickness;

  //used to check against to stop the growing and for debugggin;
  this.branchLength = Math.sqrt( (this.begin.x-this.end.x)*(this.begin.x-this.end.x)
  + (this.begin.y-this.end.y)*(this.begin.y-this.end.y) );

  this.finished = false; // so it doesn't get drawn over


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
    dir.mult(0.61803 * lengthRandomizer());                 //shorten branches
    var newEnd = p5.Vector.add(this.end,dir);     //save new endpoint in var

    //create new branch, which is less thick by a degree of thicknessDegrade;
    var right = new Branch(this.end, newEnd, this.thickness * thicknessDegrade);
    return right;
  }

  //grow a branch to the left
  this.growBranchLeft = function() {
    var dir = p5.Vector.sub(this.end,this.begin); //append it to the existing branch
    dir.rotate(-angleRandomizer() * Math.PI/180); //randomize angle, the in other direction
    dir.mult(0.61803 * lengthRandomizer());                 //shorten branches
    var newEnd = p5.Vector.add(this.end,dir);     //save new endpoint in var

    //create new branch, which is less thick by a degree of thicknessDegrade;
    var left = new Branch(this.end, newEnd, this.thickness * thicknessDegrade);
    return left;
  }
}

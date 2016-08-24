function Branch(begin, end, thickness) {
  this.begin = begin;
  this.end = end;
  this.thickness = thickness;

  this.branchLength = Math.sqrt( (this.begin.x-this.end.x)*(this.begin.x-this.end.x)
  + (this.begin.y-this.end.y)*(this.begin.y-this.end.y) );

  this.finished = false; // so it doesn't get drawn over
  //this.thickness = thickness;


  //fucntion for displaying a branch, uses line from p5.js
  this.show = function() {
    stroke('#805500');
    strokeWeight(this.thickness);
    line(this.begin.x,this.begin.y,this.end.x,this.end.y);
  }

  this.growBranchRight = function() {
    var dir = p5.Vector.sub(this.end,this.begin);
    dir.rotate(angleRandomizer() * Math.PI/180); //randomize angle
    dir.mult(lengthRandomizer()); //shorten branches
    var newEnd = p5.Vector.add(this.end,dir);

    var right = new Branch(this.end, newEnd, thickness * thicknessDegrade);
    return right;
  }

  this.growBranchLeft = function() {
    var dir = p5.Vector.sub(this.end,this.begin);
    dir.rotate(-angleRandomizer() * Math.PI/180); //randomize angle
    dir.mult(lengthRandomizer());//shorten branches
    var newEnd = p5.Vector.add(this.end,dir);

    var left = new Branch(this.end, newEnd, thickness * thicknessDegrade);
    return left;
  }
}

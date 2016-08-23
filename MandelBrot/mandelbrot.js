var minval = -2.5; // never used for some reason
var maxval = 2.5; // also never used 

var minSlider; 
var maxSlider; 
var xSlider; 
var ySlider;
var frDiv;

function setup(){
 createCanvas(200,200);
	pixelDensity(1);
	
	minSlider = createSlider(minval,0,minval,0.01);
	maxSlider = createSlider(0,maxval,maxval,0.01);
	xSlider = createSlider(-width * 2,width * 2,0,0.01)
	ySlider = createSlider(-height * 2, height * 2, 0, 0.01)
	
	frDiv = createDiv('');
}


function draw(){
 var maxIterations = 15;

	loadPixels();
	
	for(var x = 0; x < width; x++){
		for(var y = 0; y < height; y++){
		 
			var a = map(x, 0 + xSlider.value(), width + xSlider.value(), minSlider.value(), maxSlider.value()); 
			var b = map(y, 0 + ySlider.value(), height + ySlider.value(), minSlider.value(), maxSlider.value());
			
			var n = 0; 
			
			var ca = a;
			var cb = b;
			var z = 0;
			
			while(n<maxIterations){
			 var aa = a * a - b * b;
			 var bb = 2 * a * b;
			 a = aa + ca;
			 b = bb + cb;
			 
			 
			 if(abs(a + b) > 16){ 
			  break;
			 }
			  
			 n++;
			}
			
			//one way of coloring it 
			var bright = map(n, 0, maxIterations, 0, 1);
			bright = map(sqrt(bright),0,1,0,255)
			// another 
			//var bright = (n * 16) % 255;
			if(n === maxIterations){
			 bright = 0;
			}
			
			var pix = (x + y * width) * 4;
			pixels[pix + 0] = bright;
			pixels[pix + 1] = bright;
			pixels[pix + 2] = bright;
			pixels[pix + 3] = 255; 
		}	
	}
	updatePixels();
	
 frDiv.html(floor(frameRate()));

}
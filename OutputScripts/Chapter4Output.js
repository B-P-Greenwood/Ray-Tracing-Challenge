import { Matrix } from "../matrix.js";
import { Color, canvas, canvasToPPM, writePixel} from "../canvas.js";
import { point} from "../index.js";
import fs from 'fs';

let c = canvas(500, 500);
let red = new Color(1, 0, 0);
let P = point(0,0,0);
//centre 255, 255
const twelve = point(0,1,0)
const radius = 3/8;

for(let hour=1; hour<13; hour++){
    let rotation = new Matrix().rotation_z(hour*Math.PI/6);
    let mark = rotation.matrixMultipliedByTuple(twelve); 
    const x = Math.round(mark[0]* radius*500+250);
    const y = Math.round(mark[1]* radius*500+250);

    writePixel(c, x,y,red);
    writePixel(c, x+1,y+1,red);
    writePixel(c, x+1,y,red);
    writePixel(c, x,y+1,red);
}


const output = canvasToPPM(c);
fs.writeFile('./Created Images/clock.ppm', output, function (err) {
  if (err) throw err;
  console.log('Saved!');
});
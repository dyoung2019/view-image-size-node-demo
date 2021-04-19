import { resolve } from 'path';
import { openSync, readSync } from 'fs'
import { imageSize, detectImageType }  from 'view-image-size/lib';
// import detectImageType from 'view-image-size/detectImageType';

const setupView = (testFilePath) => {
  const filepath = resolve(testFilePath)
  const capacity = 8192;
  const inputBuffer = Buffer.alloc(capacity)

  const fd = openSync(filepath, 'r');
  const count = readSync(fd, inputBuffer, 0, capacity, 0);
  return new DataView(inputBuffer.buffer, 0, count);
}

const toAscii = (dv, begin, end) => {
  return Buffer.from(dv.buffer).toString('ascii', begin, end);
}

console.log('ES6 module (.mjs)')
const view = setupView('./w3c_jpeg444.jpg')
const type =  detectImageType(view, toAscii)
const result = imageSize(view, toAscii)
console.log('type:', type, ', result:', result)
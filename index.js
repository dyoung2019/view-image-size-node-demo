const path = require('path')
const fs = require('fs')
const vis = require('view-image-size');

const setupView = (testFilePath) => {
  const filepath = path.resolve(testFilePath)
  const capacity = 8192;
  const inputBuffer = Buffer.alloc(capacity)

  const fd = fs.openSync(filepath, 'r');
  const count = fs.readSync(fd, inputBuffer, 0, capacity, 0);
  return new DataView(inputBuffer.buffer, 0, count);
}

const toAscii = (dv, begin, end) => {
  return Buffer.from(dv.buffer).toString('ascii', begin, end);
}

console.log('node commonjs(2)')
const view = setupView('./w3c_jpeg444.jpg')
// console.log('imageSize', vis);
const type = vis.detectImageType(view, toAscii);
const result = vis.imageSize(view, toAscii)
console.log('type:', type, ', result:', result)
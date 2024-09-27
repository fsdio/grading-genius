# Grading Genius Library

## How to use

## 1. Install library:
```
npm install grading-genius
```
## 2. Import library
```javascript
import { CodeAnalyzer } from "grading-genius"
```
## 3. Method in library
### Iniliasization package
```javascript
analizer = new CodeAnalyzer()
```
### Function to retrieve source code specifications
```javascript
analizer.getSpecificationsFromCode(fileName)
```
### Check the compiler result by converting it to base64
```javascript
analizer.compareFileOutputs(fileName, fileName)
```
### Checking the similarity of 2 source codes
```javascript
analizer.getCheckEqualCode(fileName,fileName)
```

Example Code To Analizer
```javascript
class GanjilGenap {
    constructor(angka) {
        this.angka = angka;
    }
    getHasil() {
        if (this.angka % 2 === 0) {
            return 'Genap';
        } else {
            return 'Ganjil';
        }
    }
}
const angka = 75;
const verifyAngka = new GanjilGenap(angka);
console.log(verifyAngka.getHasil());
```
Implementation Code Analizer
```javascript
import { CodeAnalyzer } from "grading-genius";

const analizer = new CodeAnalyzer();
const fileName = 'example.js';

const spec = analizer.getSpecificationsFromCode(fileName);
console.log(spec);

const checkOutput = analizer.compareFileOutputs(fileName, fileName);
console.log(checkOutput);

const checkEquals = analizer.getCheckEqualCode(fileName,fileName)
console.log(checkEquals)
```

Return Compiler
```jquery-css
{
  functionNames: [ 'constructor', 'getHasil' ],
  classNames: [ 'GanjilGenap' ],
  variableNames: [ 'angka', 'verifyAngka' ]
}
{ status: true, expectedOutput: 'R2Fuamls', actualOutput: 'R2Fuamls' }
true
```

> Join collaboration GitHub
> > https://github.com/fsdio/grading-genius

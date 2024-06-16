# Grading Genius Library

## How to use

## 1. Install library: ``npm install grading-genius``
## 2. Method used library
### Use check equal code
   * ``const resultEqual = await checkEqualsCode.checkEqualCode(example_code, programmer_code);``
   * ``console.log(resultEqual);`` 
### Use check spesification (programmer_code)
   * ``const resultSpesifikasi = checkSpesifications.getAllSpecifications(programmer_code);``
   * ``console.log(JSON.stringify(resultSpesifikasi));``
### check equal expected output
   * ``const equalWithOutTerminal = await checkEqualsCode.checkEqualCode('test/example.js', 'test/programmer_1.js');``
   * ``console.log(equalWithOutTerminal);``
   * ``const ecpectedWithOutTerminal = checkExpecteds.checkExpecteds('test/example.js', 'test/programmer_1.js');``
   * ``console.log(ecpectedWithOutTerminal);``
## 3. have fun code.

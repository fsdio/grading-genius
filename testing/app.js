import {
	CodeAnalyzer
} from "../src/index.js";

const analizer = new CodeAnalyzer();

const fileName = 'example.js';

const spec = analizer.getSpecificationsFromCode(fileName);
console.log(spec);

const checkOutput = analizer.compareFileOutputs(fileName, fileName);
console.log(checkOutput);

const checkEquals = analizer.getCheckEqualCode(fileName,fileName)
console.log(checkEquals)

import {
	ManipulateJSFile,
	CodeAnalyzer,
} from "../src/index.js";

const analizer = new CodeAnalyzer()
const manipulateJSFile  = new ManipulateJSFile();

const fileName = 'example.js';
const variableName = 'angka';
const newValue = 75;
//
// manipulateJSFile.manipulateVariable(fileName, variableName, newValue).then(
// 	result => {
// 		console.log(result)
// 	}
// ).catch(error => {
// 	console.error(`Error: ${error.error}`);
// });
//
// manipulateJSFile.getLastVariableValue();

// const spec = analizer.getSpecificationsFromCode(fileName);
// console.log(spec);
//
// const checkOutput = analizer.compareFileOutputs(fileName, fileName);
// console.log(checkOutput);

// const checkEquals = analizer.getCheckEqualCode(fileName,fileName)
// console.log(checkEquals)

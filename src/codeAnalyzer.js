import { spawnSync } from 'child_process';
import fs from 'fs';
import { parse } from 'acorn';
import * as esprima from 'esprima';

class CodeAnalyzer {
	// Method to get specifications (function names, class names, variable names) from code or a file path
	getSpecificationsFromCode(codeOrFilePath) {
		try {
			// Read the code from a file if the path exists, otherwise use the provided code string
			const code = fs.existsSync(codeOrFilePath) ? fs.readFileSync(codeOrFilePath, 'utf-8') : codeOrFilePath;
			// Parsing code using Acorn to get the Abstract Syntax Tree (AST)
			const acornAst = parse(code, { ecmaVersion: 'latest' }); // Using the latest ECMAScript version for Acorn
			// Parsing code using Esprima for a more detailed AST
			const esprimaAst = esprima.parseScript(code, { range: true });
			
			// Initialize sets to store unique function, class, and variable names
			const specifications = {
				functionNames: new Set(),
				classNames: new Set(),
				variableNames: new Set()
			};
			
			// Traverse AST using Esprima to populate specifications
			this.traverse(esprimaAst, specifications);
			
			// Convert sets to arrays and return the specifications
			return {
				functionNames: Array.from(specifications.functionNames),
				classNames: Array.from(specifications.classNames),
				variableNames: Array.from(specifications.variableNames)
			};
		} catch (error) {
			// Handle errors by logging and returning empty arrays
			console.error('Error occurred:', error);
			return {
				functionNames: [],
				classNames: [],
				variableNames: []
			};
		}
	}
	
	// Method to recursively traverse the AST and collect specifications
	traverse(node, specifications) {
		switch (node.type) {
			case 'FunctionDeclaration':
				// Add function name to the set
				specifications.functionNames.add(node.id.name);
				break;
			case 'VariableDeclaration':
				// Add variable names to the set
				node.declarations.forEach(decl => {
					if (decl.id.type === 'Identifier') {
						specifications.variableNames.add(decl.id.name);
					}
				});
				break;
			case 'ClassDeclaration':
				// Add class name to the set
				specifications.classNames.add(node.id.name);
				break;
			case 'MethodDefinition':
				// Add method name to the set
				if (node.key.type === 'Identifier') {
					specifications.functionNames.add(node.key.name);
				}
				break;
			// Add more cases as needed for deeper analysis
		}
		
		// Traverse child nodes recursively
		for (const key in node) {
			if (node[key] && typeof node[key] === 'object' && node[key] !== null) {
				if (Array.isArray(node[key])) {
					node[key].forEach(childNode => this.traverse(childNode, specifications));
				} else {
					this.traverse(node[key], specifications);
				}
			}
		}
	}
	
	// Method to compare the outputs of two JavaScript files
	compareFileOutputs(firstFile, secondFile) {
		try {
			// Function to run a JavaScript file and get its output
			const runCommand = file => spawnSync('node', [file], { encoding: 'utf-8' }).stdout.trim();
			// Function to convert a string to its base64 representation
			const toBase64 = str => Buffer.from(str).toString('base64');
			
			// Get the outputs of the two files
			const firstOutput = runCommand(firstFile);
			const secondOutput = runCommand(secondFile);
			
			// Convert outputs to base64
			const firstOutputBase64 = toBase64(firstOutput);
			const secondOutputBase64 = toBase64(secondOutput);
			
			// Compare the base64 encoded outputs
			const isEqual = firstOutputBase64 === secondOutputBase64;
			
			// Return the comparison result
			return {
				status: isEqual,
				expectedOutput: firstOutputBase64,
				actualOutput: secondOutputBase64
			};
		} catch (error) {
			// Handle errors by logging and returning default values
			console.error('Error occurred:', error);
			return {
				status: false,
				expectedOutput: '',
				actualOutput: ''
			};
		}
	}
}

export { CodeAnalyzer };

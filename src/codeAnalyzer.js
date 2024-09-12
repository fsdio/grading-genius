import { spawnSync } from 'child_process';
import fs from 'fs';
import { parse } from 'acorn';
import * as esprima from 'esprima';

class CodeAnalyzer {
	getCheckEqualCode(firstFilePath, secondFilePath){
		const firstFile = Buffer.from(fs.readFileSync(firstFilePath, 'utf-8')).toString('base64');
		const secondFile = Buffer.from(fs.readFileSync(secondFilePath, 'utf-8')).toString('base64');
		return firstFile === secondFile;
	}
	getSpecificationsFromCode(codeOrFilePath) {
		try {
			const code = fs.existsSync(codeOrFilePath) ? fs.readFileSync(codeOrFilePath, 'utf-8') : codeOrFilePath;
			const acornAst = parse(code, { ecmaVersion: 'latest' });
			const esprimaAst = esprima.parseScript(code, { range: true });
			const specifications = {
				functionNames: new Set(),
				classNames: new Set(),
				variableNames: new Set()
			};
			this.traverse(esprimaAst, specifications);
			return {
				functionNames: Array.from(specifications.functionNames),
				classNames: Array.from(specifications.classNames),
				variableNames: Array.from(specifications.variableNames)
			};
		} catch (error) {
			console.error('Error occurred:', error);
			return {
				functionNames: [],
				classNames: [],
				variableNames: []
			};
		}
	}
	traverse(node, specifications) {
		switch (node.type) {
			case 'FunctionDeclaration':
				specifications.functionNames.add(node.id.name);
				break;
			case 'VariableDeclaration':
				node.declarations.forEach(decl => {
					if (decl.id.type === 'Identifier') {
						specifications.variableNames.add(decl.id.name);
					}
				});
				break;
			case 'ClassDeclaration':
				specifications.classNames.add(node.id.name);
				break;
			case 'MethodDefinition':
				if (node.key.type === 'Identifier') {
					specifications.functionNames.add(node.key.name);
				}
				break;
		}
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
	compareFileOutputs(firstFile, secondFile) {
		try {
			const runCommand = file => spawnSync('node', [file], { encoding: 'utf-8' }).stdout.trim();
			const toBase64 = str => Buffer.from(str).toString('base64');
			const firstOutput = runCommand(firstFile);
			const secondOutput = runCommand(secondFile);
			const firstOutputBase64 = toBase64(firstOutput);
			const secondOutputBase64 = toBase64(secondOutput);
			const isEqual = firstOutputBase64 === secondOutputBase64;
			return {
				status: isEqual,
				expectedOutput: firstOutputBase64,
				actualOutput: secondOutputBase64
			};
		} catch (error) {
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

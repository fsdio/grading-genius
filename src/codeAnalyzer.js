import { parse } from 'acorn';
import { spawnSync } from 'child_process';
import fs from 'fs';

class CodeAnalyzer {
	getSpecificationsFromCode(codeOrFilePath) {
		try {
			const code = fs.existsSync(codeOrFilePath) ? fs.readFileSync(codeOrFilePath, 'utf-8') : codeOrFilePath;
			const ast = parse(code, { ecmaVersion: 2020 });
			
			const specifications = {
				functionNames: new Set(),
				classNames: new Set(),
				variableNames: new Set()
			};
			
			this.traverse(ast, specifications);
			
			return {
				functionNames: Array.from(specifications.functionNames),
				classNames: Array.from(specifications.classNames),
				variableNames: Array.from(specifications.variableNames)
			};
		} catch (error) {
			console.error('Terjadi kesalahan:', error);
			return {
				functionNames: [],
				classNames: [],
				variableNames: []
			};
		}
	}
	
	traverse(node, specifications) {
		// Implementasi traversal AST (Abstract Syntax Tree) sesuai kebutuhan
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
			// Tambahkan case lain sesuai kebutuhan untuk menganalisis lebih dalam
		}
		
		for (const key in node) {
			if (node[key] && typeof node[key] === 'object') {
				this.traverse(node[key], specifications);
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
			console.error('Terjadi kesalahan:', error);
			return {
				status: false,
				expectedOutput: '',
				actualOutput: ''
			};
		}
	}
}

export { CodeAnalyzer };

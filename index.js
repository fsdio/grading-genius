import { parse } from 'acorn';
import { spawnSync } from 'child_process';
import fs from 'fs';

class CodeAnalyzer {
	constructor() {
		// Tidak ada konstruktor khusus yang diperlukan pada saat ini
	}
	
	getSpecificationsFromCode(codeOrFilePath) {
		let code;
		if (fs.existsSync(codeOrFilePath)) {
			// Jika parameter adalah path file, baca isi file tersebut
			code = fs.readFileSync(codeOrFilePath, 'utf-8');
		} else {
			// Jika parameter adalah kode langsung, gunakan kode tersebut
			code = codeOrFilePath;
		}
		
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
			case 'Property':
				if (node.value.type === 'FunctionExpression' || node.value.type === 'ArrowFunctionExpression') {
					specifications.functionNames.add(node.key.name);
				}
				break;
		}
		
		for (const key in node) {
			if (node[key] && typeof node[key] === 'object') {
				this.traverse(node[key], specifications);
			}
		}
	}
	
	compareFileOutputs(firstFile, secondFile) {
		try {
			const runCommand = (file) => {
				return spawnSync('node', [file], { encoding: 'utf-8' }).stdout.trim();
			};
			
			const toBase64 = (str) => Buffer.from(str).toString('base64');
			
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
			console.error('Error:', error);
			return { status: false, expectedOutput: '', actualOutput: '' };
		}
	}
}

export { CodeAnalyzer };

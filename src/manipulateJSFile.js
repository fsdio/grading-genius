import fs from 'fs';
import * as esprima from 'esprima';
import * as escodegen from 'escodegen';

class ManipulateJSFile {
	async manipulateVariable(fileName, variableName, newValue) {
		try {
			const code = await fs.promises.readFile(fileName, 'utf-8');
			const ast = esprima.parseScript(code);
			
			let variableFound = false;
			this.traverse(ast, node => {
				if (node.type === 'VariableDeclarator' && node.id.name === variableName) {
					if (node.init.type === 'Literal') {
						node.init.value = newValue;
						node.init.raw = JSON.stringify(newValue); // Update raw value to handle strings correctly
					}
					variableFound = true;
				}
			});
			
			if (!variableFound) {
				return {
					status: false,
					variableName: variableName,
					fileName: fileName
				};
			}
			
			await fs.promises.writeFile(fileName, escodegen.generate(ast), 'utf-8');
			const lastValue = this.getLastVariableValue(ast, variableName);
			return {
				status: true,
				variableName: variableName,
				fileName: fileName,
				newValue: newValue,
				lastValue: lastValue,
			};
		} catch (error) {
			return {
				success: false,
				lastValue: null,
				error: error.message,
			};
		}
	}
	
	traverse(node, callback) {
		if (node && typeof node === 'object') {
			callback(node);
			Object.keys(node).forEach(key => {
				this.traverse(node[key], callback);
			});
		}
	}
	
	getLastVariableValue(ast, variableName) {
		let lastValue = null;
		this.traverse(ast, node => {
			if (node.type === 'VariableDeclarator' && node.id.name === variableName) {
				lastValue = node.init.value;
			}
		});
		return lastValue;
	}
}

export { ManipulateJSFile };

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
					node.init.value = newValue;
					variableFound = true;
				}
			});
			
			if (!variableFound) {
				console.error(`Variabel '${variableName}' tidak ditemukan dalam file '${fileName}'.`);
				return false;
			}
			
			await fs.promises.writeFile(fileName, escodegen.generate(ast), 'utf-8');
			console.log(`Nilai variabel '${variableName}' dalam file '${fileName}' berhasil diubah menjadi '${newValue}'.`);
			return true;
		} catch (error) {
			console.error('Terjadi kesalahan:', error);
			return false;
		}
	}
	
	async manipulateArrayVariable(fileName, arrayName, index, newValue) {
		try {
			const code = await fs.promises.readFile(fileName, 'utf-8');
			const ast = esprima.parseScript(code);
			
			let arrayFound = false;
			this.traverse(ast, node => {
				if (node.type === 'VariableDeclarator' && node.id.name === arrayName && node.init.type === 'ArrayExpression') {
					if (node.init.elements[index]) {
						node.init.elements[index].value = newValue;
						arrayFound = true;
					}
				}
			});
			
			if (!arrayFound) {
				console.error(`Variabel array '${arrayName}' tidak ditemukan atau indeks '${index}' di luar batas dalam file '${fileName}'.`);
				return false;
			}
			
			await fs.promises.writeFile(fileName, escodegen.generate(ast), 'utf-8');
			console.log(`Nilai variabel array '${arrayName}' indeks '${index}' dalam file '${fileName}' berhasil diubah menjadi '${newValue}'.`);
			return true;
		} catch (error) {
			console.error('Terjadi kesalahan:', error);
			return false;
		}
	}
	
	traverse(node, callback) {
		// Implementasi traversal AST (Abstract Syntax Tree) sesuai kebutuhan
		// Anda bisa menyesuaikan dengan struktur AST yang lebih spesifik jika diperlukan
		if (node && typeof node === 'object') {
			callback(node);
			Object.keys(node).forEach(key => {
				this.traverse(node[key], callback);
			});
		}
	}
}

export { ManipulateJSFile };

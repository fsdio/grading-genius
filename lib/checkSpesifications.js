import natural from 'natural';
function tokenWord(code) {
	const tokenizer = new natural.WordTokenizer();
	const tokens = tokenizer.tokenize(code);
	const uniqueWords = new Set();
	
	const className = getNameClass(code);
	const notInsertValidate = [
		'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do',
		'else', 'export', 'extends', 'finally', 'for', 'function', 'if', 'import', 'in', 'instanceof',
		'new', 'return', 'super', 'switch', 'this', 'throw', 'try', 'typeof', 'var', 'void', 'while',
		'with', 'yield', 'let', 'static', 'enum', 'await'
	];
	const unInsertFunction = notInsertValidate.concat(className);
	
	tokens.forEach(token => {
		if (!unInsertFunction.includes(token)) {
			uniqueWords.add(token);
		}
	});
	return Array.from(uniqueWords);
}
function checkFunction(firstCode, nameFunction) {
	const runCode = `
    ${firstCode}
		return (typeof ${nameFunction} === 'function');
   `;
	const func = new Function(runCode);
	return func();
}
function getNameFunction(code) {
	const functionNames = new Set();
	const uniqueTokens = tokenWord(code);
	uniqueTokens.forEach(token => {
		if (checkFunction(code, token)) {
			functionNames.add(token);
		}
	});
	return Array.from(functionNames);
}
function getNameClass(code) {
	const classNames = new Set();
	// Regex untuk deklarasi kelas konvensional
	const conventionalClassRegex = /class\s+([A-Za-z$_][A-Za-z0-9$_]*)\s*[{(]/g;
	// Regex untuk deklarasi kelas melalui variabel
	const variableClassRegex = /(?:const|let|var)\s+([A-Za-z$_][A-Za-z0-9$_]*)\s*=\s*class\s*/g;
	let match;
	
	while ((match = conventionalClassRegex.exec(code)) !== null) {
		classNames.add(match[1]);
	}
	
	while ((match = variableClassRegex.exec(code)) !== null) {
		classNames.add(match[1]);
	}
	return Array.from(classNames);
}
function getNameVariables(code) {
	const variableDeclarationRegex = /\b(let|var|const)\s+([A-Za-z$_][A-Za-z0-9$_]*)\s*(?:=.*?;|\n)/g;
	
	const variables = new Set();
	let match;

// Loop melalui setiap kecocokan regex dalam kode
	while ((match = variableDeclarationRegex.exec(code)) !== null) {
		// Ambil nama variabel dari kecocokan regex
		const variableName = match[2];
		// Tambahkan nama variabel ke dalam set (Set secara otomatis menangani duplikat)
		variables.add(variableName);
	}
	return Array.from(variables);
}
export function getAllSpesification(code) {
	return {
		functionNames: getNameFunction(code),
		classNames: getNameClass(code),
		variables: getNameVariables(code),
	};
}

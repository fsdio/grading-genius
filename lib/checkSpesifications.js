import natural from 'natural';

// Function to tokenize code into words and filter out reserved keywords and class names
function tokenWord(code) {
	const tokenizer = new natural.WordTokenizer();
	const tokens = tokenizer.tokenize(code);
	const uniqueWords = new Set();
	
	const classNames = getNameClass(code);
	const reservedKeywords = [
		'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do',
		'else', 'export', 'extends', 'finally', 'for', 'function', 'if', 'import', 'in', 'instanceof',
		'new', 'return', 'super', 'switch', 'this', 'throw', 'try', 'typeof', 'var', 'void', 'while',
		'with', 'yield', 'let', 'static', 'enum', 'await'
	];
	const unInsertFunction = [...reservedKeywords, ...classNames];
	
	tokens.forEach(token => {
		if (!unInsertFunction.includes(token)) {
			uniqueWords.add(token);
		}
	});
	
	return Array.from(uniqueWords);
}

// Function to check if a token represents a function in the given code context
function checkFunction(code, functionName) {
	const runnableCode = `
        ${code}
        return (typeof ${functionName} === 'function');
    `;
	const func = new Function(runnableCode);
	
	// Capture console output temporarily
	let capturedConsole = [];
	const originalConsoleLog = console.log;
	console.log = (...args) => capturedConsole.push(args);
	
	const result = func();
	
	// Restore original console.log
	console.log = originalConsoleLog;
	
	return {
		result: result,
		capturedConsole: capturedConsole
	};
}

// Function to extract function names from the provided code
function getNameFunction(code) {
	const functionNames = new Set();
	const uniqueTokens = tokenWord(code);
	
	uniqueTokens.forEach(token => {
		const checkResult = checkFunction(code, token);
		if (checkResult.result) {
			functionNames.add(token);
		}
	});
	
	return Array.from(functionNames);
}

// Function to extract class names from the provided code using regex
function getNameClass(code) {
	const classNames = new Set();
	
	const conventionalClassRegex = /class\s+([A-Za-z$_][A-Za-z0-9$_]*)\s*[{(]/g;
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

// Function to extract variable names from the provided code using regex
function getNameVariables(code) {
	const variableDeclarationRegex = /\b(let|var|const)\s+([A-Za-z$_][A-Za-z0-9$_]*)\s*(?:=.*?;|\n)/g;
	const variables = new Set();
	let match;
	
	while ((match = variableDeclarationRegex.exec(code)) !== null) {
		variables.add(match[2]);
	}
	
	return Array.from(variables);
}

// Function to get all specifications (function names, class names, variable names) from the provided code
export function getAllSpecifications(code) {
	return {
		functionNames: getNameFunction(code),
		classNames: getNameClass(code),
		variables: getNameVariables(code),
	};
}

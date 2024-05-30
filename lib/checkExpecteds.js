import {execSync} from "child_process";
function deepEqual(a, b) {
	if (a === b) return true;
	
	if (typeof a !== typeof b) return false;
	
	if (typeof a === 'object' && a !== null && b !== null) {
		if (Array.isArray(a) && Array.isArray(b)) {
			if (a.length !== b.length) return false;
			for (let i = 0; i < a.length; i++) {
				if (!deepEqual(a[i], b[i])) return false;
			}
			return true;
		} else if (!Array.isArray(a) && !Array.isArray(b)) {
			const keysA = Object.keys(a);
			const keysB = Object.keys(b);
			if (keysA.length !== keysB.length) return false;
			for (let key of keysA) {
				if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
			}
			return true;
		} else {
			return false;
		}
	}
	
	return false;
}
export function checkExpected(topCode = '', bottomCode = '', originalCode, expectedOutput) {
	const templateCode = `
	${topCode}
	${originalCode}
	${bottomCode}
	`;
	
	const result = new Function(templateCode);
	const view = result();
	return {
		status: deepEqual(view, expectedOutput),
		expectedOutput: expectedOutput,
		output: view,
	};
}
export function checkByOutputTerminal(filePath) {
	try {
		const result = execSync(`node ${filePath}`, { encoding: 'utf-8' }).trim();
		const binaryRepresentation = result.split('').map(char => char.charCodeAt(0).toString(2));
		return {
			cut: binaryRepresentation
		};
	} catch (error) {
		console.error('Terjadi kesalahan:', error);
	}
}

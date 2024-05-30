import { ESLint } from 'eslint';
import prettier from 'prettier';
import _ from 'lodash';
import { checkByOutputTerminal } from "./checkExpecteds.js";

const eslint = new ESLint();
export async function checkEqualCode(code1, code2) {
	try {
		// Menghapus spasi kosong yang berlebihan
		const normalizedCode1 = code1.replace(/\s+/g, ' ').trim();
		const normalizedCode2 = code2.replace(/\s+/g, ' ').trim();
		
		// Memeriksa kesamaan string yang telah dinormalisasi
		return normalizedCode1 === normalizedCode2;
	} catch (error) {
		console.error(error);
		return false; // Mengembalikan false jika terjadi kesalahan
	}
}


export function checkEqualOutput(filePathFirst, filePathSecond) {
	const firstCode = checkByOutputTerminal(filePathFirst);
	const secondCode = checkByOutputTerminal(filePathSecond);
	
	return _.isEqual(firstCode, secondCode);
}

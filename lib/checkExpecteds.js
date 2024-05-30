import {execSync} from "child_process";
import _ from 'lodash';
export function checkExpecteds(firstFile, secondFile) {
	try {
		const excFirst = execSync(`node ${firstFile}`, { encoding: 'utf-8' }).trim();
		const excSecond = execSync(`node ${secondFile}`, { encoding: 'utf-8' }).trim();
		
		const resultFirstBinary = excFirst.split('').map(char => char.charCodeAt(0).toString(2));
		const resultSecondBinary = excSecond.split('').map(char => char.charCodeAt(0).toString(2));
		
		const resultFirstString = resultFirstBinary.map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
		const resultSecondString = resultSecondBinary.map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
		
		return {
			status: _.isEqual(resultFirstBinary, resultSecondBinary),
			expectedOutput: resultFirstString,
			yourOutput: resultSecondString
		};
	} catch (error) {
		console.error('Terjadi kesalahan:', error);
	}
}
